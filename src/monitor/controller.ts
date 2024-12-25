import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { JWT } from "../jwt";
import { inject } from "inversify";
import { MonitorService } from "./services";
import { Request, Response } from "express";


@controller('/monitor')

export class Monitor {
    constructor(
        @inject(MonitorService) private readonly MonitorService: MonitorService,
        @inject(JWT) private readonly jwt: JWT
    ) {
    }

    @GetMapping('/LogList', JWT.middleware())

    public async getInfo(req: Request, res: Response) {
        let result = await this.MonitorService.getLogList(res, req.query)
        return res.status(200).send(result)
    }
}