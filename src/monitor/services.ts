import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaDB } from "../db";
import { JWT } from "../jwt";
import { sendResponse } from "../common";


injectable()
export class MonitorService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly JWT: PrismaDB,
    ) {

    }

    /**
     * 获取日志列表
     */

    public async getLogList(res, { page = 1, limit = 10 }) {
        try {
            //跳过的记录数
            const skip = (Number(page) - 1) * limit;

            //获取数据总数
            const totalCount = await this.PrismaDB.prisma.log.count()

            const list = await this.PrismaDB.prisma.log.findMany({
                skip, //跳过的记录数
                take: Number(limit), //每页记录数
            })

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
}