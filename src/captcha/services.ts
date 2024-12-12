import { inject } from "inversify";
import { PrismaDB } from "../db";
import { JWT } from "../jwt";
import svgCaptcha from "svg-captcha";
import sharp from 'sharp';

export class CaptchaService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly JWT: JWT
    ) {
    }


    /**
     * 创建验证码
     */
    public async generateCaptcha(req, res) {
        const captcha = svgCaptcha.create({
            size: 4, // 验证码长度
            noise: 2, // 干扰线条数
            color: true, // 验证码字符是否有颜色，默认false
            background: '#cc9966', // 验证码图片背景颜色
        });
        req.session.captcha = captcha.text.toLowerCase();

        const svgBuffer = Buffer.from(captcha.data);
        const base64Captcha = svgBuffer.toString('base64');
        return res.status(200).json({ code: 200, data: { captcha: `data:image/svg+xml;base64,${base64Captcha}` } });
    }
}