import { inject } from "inversify";
import { controller, httpPost as PostMapping, httpGet as GetMapping } from "inversify-express-utils";
import { RoleService } from "./services";
import { Request, Response } from "express";
import { JWT } from "../jwt";

@controller('/role')

export class Role {
    constructor(@inject(RoleService) private readonly RoleService,
    @inject(JWT) private readonly jwt: JWT) {
    }

    @PostMapping('/add', JWT.middleware())

    public async addInfo(req: Request, res: Response) {
        await this.RoleService.addRole(req, res)
        return
    }

    @GetMapping('/list', JWT.middleware())

    public async getInfo(req: Request, res: Response) {
        let result = await this.RoleService.getRoleList(req.query, res)
        return result
    }
}