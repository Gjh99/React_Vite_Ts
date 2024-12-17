import { id, inject, injectable } from "inversify";
import { PrismaDB } from "../db";
import { JWT } from "../jwt";
import { convertToTree } from "../common";


injectable()

export class MenuService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT
    ) { }



    /**
     * getMenu 获取所有菜单
     */
    public async getAllMenu(req, res) {
        try {
            const menus = await this.PrismaDB.prisma.menu.findMany({
                orderBy: {
                    order_num: 'asc'
                },
                include: {
                    children: {
                        orderBy: {
                            order_num: 'asc'
                        }
                    }
                }
            });
            const data = menus.map(menu => ({
                ...menu,
                children: menu.children.length > 0 ? menu.children : null,
            }));

            res.status(200).json({ code: 200, data });
        } catch (err) {
            res.status(500).json({ error: "获取菜单列表失败", details: err.message });
        }

    }

    /**
     * 获取当前角色权限菜单
     * 
     */
    public async getMenus(req, res) {
        try {
            const { userId } = req.user

            const userRoles = await this.PrismaDB.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    role: {
                        include: {
                            role_menu: {
                                include: {
                                    menu: {
                                        select: {
                                            id: true,
                                            menu_name: true,
                                            path: true,
                                            parent_id: true,
                                            order_num: true,
                                            icon: true,
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            });


            if (!userRoles) {
                return res.status(400).json({ error: "获取失败" });
            }

            // 排序
            const sortMenu = userRoles.role.role_menu.sort((a, b) => a.menu.order_num - b.menu.order_num);
            
            const menus = sortMenu.map((roleMenu) => roleMenu.menu);
            console.log(menus);

            let data = convertToTree(menus)

            res.status(200).json({ code: 200, data });
        } catch (err) {
            res.status(500).json({ error: "获取菜单列表失败", details: err.message });
        }
    }
}