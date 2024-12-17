import { inject } from "inversify";
import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { JWT } from "../jwt";
import { Request,Response } from "express";
import { MenuService } from "./services";

@controller('/menu')

export class Menu {
    constructor(
        @inject(MenuService) private readonly MenuService,
        @inject(JWT) private readonly jwt: JWT
    ) {
    }

    @GetMapping('/getAllMenu', JWT.middleware())


    /**
     * getAllMenu
     */
    public async getAllMenu(req:Request,res:Response) {
        await this.MenuService.getAllMenu(req, res)
    }

    @GetMapping('/getMenus', JWT.middleware())


    /**
     * getMenus
     */
    public async getMenus(req:Request,res:Response) {
        await this.MenuService.getMenus(req, res)
    }
}