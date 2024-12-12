import { inject } from "inversify";
import { controller, httpGet as GetMapping, httpPost as PostMapping }  from "inversify-express-utils";
import { DictService } from "./services";
import { JWT } from "../jwt";


@controller('/dict')

export class Dict {
    constructor(@inject(DictService) private readonly DictService,
        @inject(JWT) private readonly jwt: JWT
    ) {
    }

    @PostMapping('/addDictType', JWT.middleware())

    public async addDictType(req, res) {
        await this.DictService.addDictType(req, res)
        return
    }

    @PostMapping('/addDictData', JWT.middleware())

    public async addDictData(req, res) {
        await this.DictService.addDictData(req, res)
        return
    }

    @GetMapping('/dictTypeList', JWT.middleware())

    public async getDictTypeList(req, res) {
        await this.DictService.getDictTypeList(req, res)
        return
    }

    @GetMapping('/dictDataList', JWT.middleware())
    public async getDictDataList(req, res) {
        await this.DictService.getDictDataList(req, res)
        return
    }
}