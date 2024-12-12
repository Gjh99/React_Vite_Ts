import { inject } from "inversify";
import { PrismaDB } from "../db";
import { sendResponse } from "../common";
import { JWT } from "../jwt";

export class RoleService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT
    ) { }

    /**
     * addRole
     */
    public async addRole(req, res) {
        let { body: data, user } = req
        const checkRoleName = await this.PrismaDB.prisma.role.findFirst({
            where: {role_name:data.role_name}
        })
        
        if (checkRoleName) {
            return sendResponse(res, 500, '角色名不能重复')
        }

        await this.PrismaDB.prisma.role.create({
            data: {
                ...data,
                createdById: user.userId
            }
        })
        return sendResponse(res, 200, '添加角色成功')
    }

    /**
     * getRoleList
     */
    public async getRoleList(req, res) {
        const list = await this.PrismaDB.prisma.role.findMany()
        return sendResponse(res, 200, '查询成功', list)
    }
}