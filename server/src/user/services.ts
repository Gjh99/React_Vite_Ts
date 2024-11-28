
import { inject, injectable } from "inversify";
import { PrismaDB } from '../db'
import { UserDto } from './user.dto'
import { plainToClass } from 'class-transformer' //dto验证
import { validate } from 'class-validator' //dto验证
import { JWT } from "../jwt";
import * as bcrypt from 'bcryptjs';
import { handleError, sendResponse } from "../common";

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


    public async getUserInfo({ page, limit, user_name, nick_name, status }) {
        if (!page || !limit) {
            let data = await this.PrismaDB.prisma.user.findMany()
            return {
                code: 200,
                data,
                msg: '查询成功'
            }
        }
        //跳过的记录数
        const skip = (Number(page) - 1) * limit;

        //获取数据总数
        const totalCount = await this.PrismaDB.prisma.user.count()

        const list = await this.PrismaDB.prisma.user.findMany({
            where: {
                nick_name: {
                    contains: nick_name,
                },
                user_name: {
                    contains: user_name,
                },
                status: Boolean(status)
            },
            skip, //跳过的记录数
            take: Number(limit) //每页记录数
        })

        return {
            code: 200,
            data: list,
            totalCount,  // 总记录数
            totalPages: Math.ceil(totalCount / Number(limit)), // 总页数
            currentPage: Number(page),  // 当前页码
            pageSize: Number(limit),  // 每页记录数
        }
    }

    public async addUserInfo(data: UserDto, res) {
        try {
            const user = plainToClass(UserDto, data)
            const errors = await validate(user)
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

            await this.PrismaDB.prisma.user.create({ data: { ...data, password: hashedPassword } })

            return sendResponse(res, 200, '添加用户成功')

        } catch (error) {
            return sendResponse(res, 500, '添加用户失败', error)
        }
    }

    public async editUserInfo(req, res) {
        try {
            const { id } = req.body;
            await this.PrismaDB.prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...req.body
                }
            })
            return sendResponse(res, 200, '修改用户信息成功')
        } catch (error) {
            return sendResponse(res, 500, '修改用户信息失败', error)
        }
    }

} 