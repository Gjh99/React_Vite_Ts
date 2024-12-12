import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "./services";
import { Request,Response } from "express";
import { JWT } from "../jwt";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

@controller('/user')

export class User {
    constructor(@inject(UserService) private readonly UserService,
    @inject(JWT) private readonly jwt: JWT      
    ) {
    }

    @GetMapping('/infoList', JWT.middleware())

    public async getInfo(req:Request,res:Response) {
        let result =  await this.UserService.getUserInfo(res, req.query)
        return res.status(200).send(result)
    }

    @PostMapping('/login')

    public async login(req:Request, res:Response) {
        let result =  await this.UserService.login(req.body, res)
        return res.status(200).send(result)
    }

    @PostMapping('/add', JWT.middleware())

    public async addInfo(req:Request, res:Response) {
        // const currentUserId = req.user.id;
        await this.UserService.addUserInfo(req, res)
        return
    }

    @PostMapping('/edit', JWT.middleware())

    public async editInfo(req:Request, res:Response) {
        await this.UserService.editUserInfo(req, res)
        return
    }

    @PostMapping('/delete', JWT.middleware())
    
    public async deleteInfo(req:Request, res:Response) {
        await this.UserService.deleteUserInfo(req, res)
        return
    }

    @PostMapping('/downloadTemplate', JWT.middleware())

    public async downloadTemplate(req:Request, res:Response) {
        let result =  await this.UserService.downloadTemplate(res)

        // 设置文件名和下载响应头
        res.setHeader('Content-Disposition', 'attachment; filename=users_template.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        return res.status(200).send(result)
    }

    @PostMapping('/uploadExcel', JWT.middleware(), upload.single('file'))

    public async uploadExcel(req:Request, res:Response) {
        let result =  await this.UserService.uploadExcel(req, res)
        return res.status(200).send(result)
    }

    @PostMapping('/exportExcel', JWT.middleware())
    public async exportExcel(req: Request, res: Response) {
        let result =  await this.UserService.exportExcel(req, res);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return res.status(200).send(result)
    }
}