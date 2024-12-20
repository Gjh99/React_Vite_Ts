import { inject } from "inversify";
import { PrismaDB } from "../db";
import { sendResponse } from "../common";
import { JWT } from "../jwt";
import * as XLSX from 'xlsx';

export class RoleService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT
    ) { }

    /**
     * addRole
     */
    public async addRole(req, res) {
        let { body, user } = req
        const checkRoleName = await this.PrismaDB.prisma.role.findFirst({
            where: { role_name: body.role_name }
        })

        if (checkRoleName) {
            return sendResponse(res, 500, '角色名不能重复')
        }

        let { menu_id, ...data } = body
        
        if (!Array.isArray(menu_id) || menu_id.length === 0) {
            return sendResponse(res, 500, '菜单ID不能为空');
        }
    
        try {
            await this.PrismaDB.prisma.$transaction(async (prisma) => {
                await this.PrismaDB.prisma.role.create({
                    data: {
                        ...data,
                        createdById: user.userId
                    }
                })

                const { id } = await this.PrismaDB.prisma.role.findFirst({
                    where: { role_name: data.role_name }
                })

                const newBindings = menu_id.map((menuId: number) => ({
                    role_id: id,
                    menu_id: menuId,
                }));

                await this.PrismaDB.prisma.role_menu.createMany({
                    data: newBindings,
                });

            })
            return sendResponse(res, 200, '添加角色成功')
        } catch (error) {
            return sendResponse(res, 500, '添加角色失败', error.message);
        }
    }

    /**
     * getRoleList
     */
    public async getRoleList(res, { page = 1, limit = 10, role_name, status, startTime, endTime }) {
        const skip = (Number(page) - 1) * limit;
        const dateFilter = {
            ...(startTime && { gte: new Date(startTime) }),
            ...(endTime && { lte: new Date(new Date(endTime).setHours(23, 59, 59, 999)) }),
        }

        const whereFilter = {
            ...(role_name && { role_name: { contains: role_name } }),
            ...(status !== undefined && { status: Boolean(status) }),
            create_time: dateFilter.gte || dateFilter.lte ? dateFilter : undefined,
        }

        console.log(whereFilter);


        const totalCount = await this.PrismaDB.prisma.role.count();

        const role = await this.PrismaDB.prisma.role.findMany({
            where: whereFilter,
            skip,
            include: {
                role_menu: true
            },
            take: Number(limit)
        })

        return {
            code: 200,
            data: role,
            totalCount,  // 总记录数
            totalPages: Math.ceil(totalCount / Number(limit)), // 总页数
            currentPage: Number(page),  // 当前页码
            pageSize: Number(limit),  // 每页记录数
        }
    }

    /**
     * 修改用户权限
     */
    public async editRoleAuth(req, res) {
        const { body: data } = req;
        const { id, menu_id, ...roleData } = data;
        
        if (!Array.isArray(menu_id) || menu_id.length === 0) {
            return sendResponse(res, 500, '菜单ID不能为空');
        }
    
        // 检查角色是否存在
        const role = await this.PrismaDB.prisma.role.findUnique({
            where: { id }
        });
    
        if (!role) {
            return sendResponse(res, 500, '角色不存在');
        }
    
        try {
            await this.PrismaDB.prisma.$transaction(async (prisma) => {
                 await prisma.role.update({
                    where: { id },
                    data: {
                        ...roleData
                    }
                });
                
                await prisma.role_menu.deleteMany({
                    where: { role_id: id }
                });
                
                const newBindings = menu_id.map((menuId: number) => ({
                    role_id: id,
                    menu_id: menuId,
                }));

                await prisma.role_menu.createMany({
                    data: newBindings,
                });
            });
    
            return sendResponse(res, 200, '更新角色权限成功');
        } catch (error) {
            return sendResponse(res, 500, '更新角色权限失败', error.message);
        }
    }

    /**
     * 删除用户权限信息
     */
    public async deleteRoleAuth(req, res) {
        try {
            const { id } = req.body
            await this.PrismaDB.prisma.role.deleteMany({
                where: {
                    id: {
                        in: id
                    }
                }
            })
            await this.PrismaDB.prisma.role_menu.deleteMany({
                where: {
                    role_id: {
                        in: id
                    }
                }
            })
            return sendResponse(res, 200, '删除角色信息成功')
        } catch (error) {
            return sendResponse(res, 500, '删除角色信息失败', error)
        }
    }

    /**
     * 导出
     */
    public async exportRole(res) {
        const role = await this.PrismaDB.prisma.role.findMany()
        const data = role.map(item => {
            return {
                '角色名': item.role_name,
                '状态': item.status ? '启用' : '禁用',
                '创建时间': item.create_time.toISOString(),
            }
        })

        // 创建工作簿
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '角色信息');

        const fileBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        // 发送文件到客户端
        return fileBuffer;
    }
}