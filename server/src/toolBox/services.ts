import { inject } from "inversify";
import { PrismaDB } from "../db";
import multer from 'multer';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { Request,Response } from "express";
import { sendResponse } from "../common";

// 设置默认的高质量值
const DEFAULT_QUALITY = 90;

declare module 'express' {
    export interface Request {
        file?: multer.File;
    }
}

export class ToolBoxService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) { }

    public async processImage(req:Request, res:Response) {
        const {format, imgWidth, imgHeight} = req.body;
        const file = req.file;
        try {
            if (!file) {
                return sendResponse(res, 400,'未上传图片',null )
            }

            const outputFormat = format.toLowerCase();
            let image = sharp(file.buffer);

            if (imgWidth || imgHeight) {
                image = image.resize(parseInt(imgWidth) || null, parseInt(imgHeight) || null);
            }

            if (outputFormat === 'jpeg') {
                image = image.jpeg({ quality: DEFAULT_QUALITY });
            } else if (outputFormat === 'webp') {
                image = image.webp({ quality: DEFAULT_QUALITY });
            } else if (outputFormat === 'avif') {
                image = image.avif({ quality: DEFAULT_QUALITY });
            }

            // ico转换png、jpeg、jpg
            if (file.mimetype === 'image/x-icon') {
                const icojs = await import('icojs');
                const iconImages = await icojs.parseICO(file.buffer);

                if (!iconImages || iconImages.length === 0) {
                   return sendResponse(res, 400,'无法解析 ICO 文件',null )
                }

                const firstIcon = iconImages[0];
                image = sharp(firstIcon.buffer);

                if (outputFormat === 'png' || outputFormat === 'jpeg' || outputFormat === 'jpg') {
                    const buffer = await image.toFormat(outputFormat).toBuffer();
                    res.set('Content-Type', `image/${outputFormat}`);
                    return res.status(200).send(buffer);
                } else {
                    return sendResponse(res, 400,'不支持的目标格式',null );
                }
            }

            if (outputFormat !== 'ico') {
                const buffer = await image.toFormat(outputFormat).toBuffer();
                res.set('Content-Type', `image/${outputFormat}`);
                return res.status(200).send(buffer);
            }

            const buffer = await image.toBuffer();
            try {
                const icoBuffer = await pngToIco(buffer);
                res.set('Content-Type', 'image/x-icon');
                return res.status(200).send(icoBuffer);
            } catch (err) {
                return sendResponse(res, 400,'转换为 ICO 时出错',null );
            }
        } catch (e) {
            return sendResponse(res, 400,'处理图像时出错',null );
        }

    }
}
