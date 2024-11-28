import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "./services";
import { query, Request,Response } from "express";


@controller('/user')

export class User {
    constructor(@inject(UserService) private readonly UserService) {

    }

    @GetMapping('/infoList')

    public async getInfo(req:Request,res:Response) {
        let result =  await this.UserService.getUserInfo(req.query)
        res.send(result)
    }

    @PostMapping('/login')

    public async login(req:Request, res:Response) {
        let result =  await this.UserService.login(req.body, res)
        res.send(result)
    }

    @PostMapping('/add')

    public async addInfo(req:Request, res:Response) {
        let result =  await this.UserService.addUserInfo(req.body, res)
        res.send(result)
    }

    @PostMapping('/edit')

    public async editInfo(req:Request, res:Response) {
        let result =  await this.UserService.editUserInfo(req, res)
        res.send(result)
    }
}