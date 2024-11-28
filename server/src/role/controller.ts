import { inject } from "inversify";
import { controller, httpPost as PostMapping, httpGet as GetMapping } from "inversify-express-utils";
import { RoleService } from "./services";
import { Request, Response } from "express";

@controller('/role')

export class Role {
    constructor(@inject(RoleService) private readonly RoleService) {
    }

    @PostMapping('/add')

    public async addInfo(req: Request, res: Response) {
        let result = await this.RoleService.addRole(req.body, res)
        res.send(result)
    }

    @GetMapping('/list')

    public async getInfo(req: Request, res: Response) {
        let result = await this.RoleService.getRoleList(req.query, res)
        res.send(result)
    }
}