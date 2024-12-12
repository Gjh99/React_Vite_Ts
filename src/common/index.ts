import { Response } from 'express';

export interface ApiResponse {
    code: number;
    msg: string;
    data: any;
}

export const sendResponse = (res: Response, code: number, msg: string, data: any = null): void => {
    res.status(code).json({
        code,
        msg,
        data,
    });
};

export const handleError = (arr)=>{
    const dto = {}
    arr.forEach(error => {
        Object.keys(error.constraints).forEach(key => {
            dto[error.property] = error.constraints[key]
        })
    })
    return dto
}
