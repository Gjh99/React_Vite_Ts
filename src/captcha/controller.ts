import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { CaptchaService } from "./services";


@controller('/captcha')

export class Captcha {
    constructor(
        @inject(CaptchaService) private readonly CaptchaService: CaptchaService,
    ) {
    }
    @GetMapping('/img')

    /**
     * createCaptcha
     */
    public async createCaptcha(req: Request, res: Response) {
        await this.CaptchaService.generateCaptcha(req, res)
        return
    }
}