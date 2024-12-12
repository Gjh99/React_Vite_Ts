import { inject } from "inversify";
import { PrismaDB } from "../db";
import { JWT } from "../jwt";
import { sendResponse } from "../common";


export class DictService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT) {
    }

    /**
     * addDictType
     */
    public async addDictType(req, res) {
        let { body: data, user } = req

        await this.PrismaDB.prisma.dictType.create({
            data: {
                ...data,
                createdById: user.userId
            }
        })
        return sendResponse(res, 200, '添加字典类型成功')
    }

    /**
     * getDictTypeList
     * 
     */

    public async getDictTypeList(req, res) {
        const list = await this.PrismaDB.prisma.dictType.findMany()
        return sendResponse(res, 200, '查询成功', list)
    }

    /**
     * addDictData
     */
    public async addDictData(req, res) {
        let { body: data, user } = req

        await this.PrismaDB.prisma.dictData.create({
            data: {
                ...data,
                createdById: user.userId
            }
        })
        return sendResponse(res, 200, '添加字典数据成功')
    }

    /**
     * getDictDataList
     * 
     */
    public async getDictDataList(req, res) {
        try {
            let { query } = req
            const dictTypeAndData = await this.PrismaDB.prisma.dictType.findUnique({
                where: {
                    dict_type: query.dict_type
                },
                include: {
                    DictData: {
                        where: {
                            status: true
                        }
                    }
                }
            })

            if (!dictTypeAndData) {
                return sendResponse(res, 200, '查询失败')
            }

            let dictData = dictTypeAndData.DictData.map(item => {
                return {
                    id: item.id,
                    label: item.data_label,
                    value: item.data_value
                }
            })

            return sendResponse(res, 200, '查询成功', dictData)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}