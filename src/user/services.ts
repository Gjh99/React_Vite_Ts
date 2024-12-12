
import { inject, injectable } from "inversify";
import { PrismaDB } from '../db'
import { AddUserDto, UserDto } from './user.dto'
import { plainToClass } from 'class-transformer' //dto验证
import { validate } from 'class-validator' //dto验证
import { JWT } from "../jwt";
import * as bcrypt from 'bcryptjs';
import { handleError, sendResponse } from "../common";
import * as XLSX from 'xlsx';

injectable()
export class UserService {
    // 依赖注入
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT
    ) { }

    /**
     * login
     */
    public async login(data: UserDto, res) {
        const LoginDto = plainToClass(UserDto, data)
        const errors = await validate(LoginDto)
        if (errors.length) {
            let dto = handleError(errors)
            return sendResponse(res, 500, '登录失败', dto)
        }

        //账号验证
        const user = await this.PrismaDB.prisma.user.findFirst({
            where: { user_name: data.user_name }
        })
        if (!user) {
            return sendResponse(res, 500, '账号不存在')
        }

        // 密码验证
        const password = await bcrypt.compare(data.password, user.password)
        if (!password) {
            return sendResponse(res, 500, '密码错误')
        }

        //密码通过，生成tk
        const token = await this.jwt.createToken({ userId: user.id })

        return { token }
    }

    /**
     * 获取用户列表
     */

    public async getUserInfo(res, { page = 1, limit = 10, user_name, nick_name, status, startTime, endTime }) {
        try {
            //跳过的记录数
            const skip = (Number(page) - 1) * limit;

            const dateFilter = {
                ...(startTime && { gte: new Date(startTime) }),
                ...(endTime && { lte: new Date(new Date(endTime).setHours(23, 59, 59, 999)) }),
            }

            const whereFilter = {
                ...(user_name && { user_name: { contains: user_name } }),
                ...(nick_name && { nick_name: { contains: nick_name } }),
                ...(status !== undefined && { status: Boolean(status) }),
                create_time: dateFilter.gte || dateFilter.lte ? dateFilter : undefined,
            }

            //获取数据总数
            const totalCount = await this.PrismaDB.prisma.user.count()

            const users = await this.PrismaDB.prisma.user.findMany({
                where: whereFilter,
                skip, //跳过的记录数
                take: Number(limit), //每页记录数
                include: {
                    role: { select: { role_name: true } }
                }
            })

            const list = users.map(user => ({
                ...user,
                role_name: user.role?.role_name, // 添加 role_name 字段
            }))

            return {
                code: 200,
                data: list,
                totalCount,  // 总记录数
                totalPages: Math.ceil(totalCount / Number(limit)), // 总页数
                currentPage: Number(page),  // 当前页码
                pageSize: Number(limit),  // 每页记录数
            }

        } catch (error) {
            return sendResponse(res, 500, error)
        }
    }

    /**
     * 
     * 添加用户信息
     */

    public async addUserInfo(req, res) {
        let { body: data, user } = req
        try {
            const userVaildate = plainToClass(AddUserDto, data)
            const errors = await validate(userVaildate)
            if (errors.length) {
                let dto = handleError(errors)
                return dto
            }
            // 检查当前用户名是否存在
            const checkUser = await this.PrismaDB.prisma.user.findFirst({
                where: { user_name: data.user_name }
            })

            if (checkUser) {
                return sendResponse(res, 500, '用户名不能重复')
            }
            //加密轮数
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds); //加密

            await this.PrismaDB.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                    createdById: user.userId
                }
            })

            return sendResponse(res, 200, '添加用户成功')

        } catch (error) {
            return sendResponse(res, 500, '添加用户失败', error)
        }
    }

    /**
     * 
     * 添加修改信息
     */

    public async editUserInfo(req, res) {
        try {
            const { id, roleId, update_time, create_time, role_name, role, ...data } = req.body;

            const nowUser = await this.PrismaDB.prisma.user.findUnique({
                where: {
                    id: Number(id)
                },
                select: { roleId: true }
            })


            const updateData = {
                ...data,
                update_time: new Date()
            }

            if (nowUser.roleId !== roleId) {
                updateData.role = {
                    connect: { id: roleId },
                };
            }

            await this.PrismaDB.prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...updateData
                }
            })
            return sendResponse(res, 200, '修改用户信息成功')
        } catch (error) {
            return sendResponse(res, 500, '修改用户信息失败', error)
        }
    }

    /**
     * 
     * 删除用户信息
     */
    public async deleteUserInfo(req, res) {
        try {
            const { userIds } = req.body
            await this.PrismaDB.prisma.user.deleteMany({
                where: {
                    id: {
                        in: userIds
                    } 
                }
            })
            return sendResponse(res, 200, '删除用户信息成功')
        } catch (error) {
            return sendResponse(res, 500, '删除用户信息失败', error)
        }
    }


    /**
     * 下载模板
     */
    public async downloadTemplate(res) {
        const data = [
            ['账号', '用户名', '角色Id', '电话', '密码'], //表头
            ['', '', '', '', '']
        ]


        // 创建工作簿
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '用户信息模板');

        const fileBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        // 发送文件到客户端
        return fileBuffer;
    }

    /**
     * 上传Excel文件
     */
    public async uploadExcel(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(500).send({ message: '文件不能为空' });
        }
        // 读取文件
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];

        // 将 Excel 数据转换为 JSON 格式
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const fieldMapping = {
            '用户名': 'user_name',
            '昵称': 'nick_name',
            '电话': 'phone',
            '密码': 'password',
            '角色': 'roleId',
        };

        // 字段映射
        const mappedData = jsonData.map((row) => {
            const mappedRow = {};
            for (const [excelKey, dbKey] of Object.entries(fieldMapping)) {
                mappedRow[dbKey] = String(row[excelKey]);
            }
            return mappedRow;
        });

        for (const row of mappedData) {
            // 将每行数据映射到 AddUserDto
            const userDto = plainToClass(AddUserDto, row);
            const errors = await validate(userDto);  // 验证 DTO
            if (errors.length) {
                return { message: '数据格式不正确', errors };
            }

            if (!userDto.roleId) {
                return res.status(400).send({ message: "角色ID不能为空" });
            }

            const roleExists = await this.PrismaDB.prisma.role.findFirst({
                where: { id: Number(userDto.roleId) },
            });

            // 检查用户名是否已存在
            const existingUser = await this.PrismaDB.prisma.user.findFirst({
                where: { user_name: userDto.user_name },
            });

            if (existingUser) {
                return { message: `用户名 ${userDto.user_name} 已存在` };
            }

            //加密轮数
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userDto.password, saltRounds); //加密

            // 如果数据合法，插入到数据库
            await this.PrismaDB.prisma.user.create({
                data: {
                    user_name: userDto.user_name,
                    nick_name: userDto.nick_name,
                    roleId: Number(userDto.roleId),
                    password: hashedPassword
                },
            });

        }
        return { message: '导入成功' };
    }

    /**
     * 导出excel
     */
    public async exportExcel(req, res) {
        const user = await this.PrismaDB.prisma.user.findMany({
            include: {
                role: { select: { role_name: true } }
            }
        })

        // 将数据转换成excel格式
        const data = user.map((user) => ({
            '账号': user.user_name,
            '用户名': user.nick_name,
            '角色': user.role?.role_name,
            '电话': user.phone_number,
            '是否启用': user.status ? '启用' : '禁用',
            '创建时间': user.create_time.toISOString(),
            '更新时间': user.update_time.toISOString(),
        }));

        const ws = XLSX.utils.json_to_sheet(data);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '用户信息');

        const fileBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        return fileBuffer
    }

} 