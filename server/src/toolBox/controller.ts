import { inject } from "inversify";
import { controller, httpPost as PostMapping } from "inversify-express-utils";
import { ToolBoxService } from "./services";
import { Request,Response } from "express";

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


@controller('/toolBox')

export class ToolBox {
    constructor(@inject(ToolBoxService) private readonly ToolBoxService) {}

    @PostMapping('/processImage', upload.single('image'))

    public async processImage(req:Request,res:Response) {
        let result = await this.ToolBoxService.processImage(req, res)
        res.send(result)
    }

    
}