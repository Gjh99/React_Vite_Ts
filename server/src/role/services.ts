import { inject } from "inversify";
import { PrismaDB } from "../db";
import { sendResponse } from "../common";

export class RoleService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) { }

    /**
     * addRole
     */
    public async addRole(data, res) {
        // let { id } = data
        // const checkId = this.PrismaDB.prisma.role.findFirst({
        //     where: {id}
        // })
        // if (id) {
        //     sendResponse(res, 500, '')
        // }
        await this.PrismaDB.prisma.role.create({data})
        return sendResponse(res, 200, '添加角色成功')
    }

    /**
     * getRoleList
     */
    public async getRoleList(req, res) {
        const list = await this.PrismaDB.prisma.role.findMany()
        return sendResponse(res, 200, '添加角色成功', list)
    }
}