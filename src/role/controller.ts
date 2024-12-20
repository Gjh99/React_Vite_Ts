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

    @PostMapping('/edit', JWT.middleware())

    public async editInfo(req: Request, res: Response) {
        await this.RoleService.editRoleAuth(req, res)
        return
    }

    @PostMapping('/del', JWT.middleware())

    public async delInfo(req: Request, res: Response) {
        await this.RoleService.deleteRoleAuth(req, res)
        return
    }

    @PostMapping('/exportExcel', JWT.middleware())

    public async exportInfo(req: Request, res: Response) {
        let result = await this.RoleService.exportRole(req, res)
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return res.status(200).send(result)
    }

    @GetMapping('/list', JWT.middleware())

    public async getInfo(req: Request, res: Response) {
        let result = await this.RoleService.getRoleList(res, req.query)
        return result
    }
}