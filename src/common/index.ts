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


export const convertToTree = (list = []) =>{
    const res = []

    let itemMap = {}

    list.forEach(item =>{
        let id = item.id;
        let pId = item.parent_id;

        if (!itemMap[id]) {
            itemMap[id] = {
                ...item,
                children:[]
            }
        }

        if (!pId) {
            // 没有父级是顶层
            res.push(itemMap[id])
        } else {
            // if(!itemMap[pId]) {
            //     itemMap[pId] = {
            //         children: []
            //     }
            // }
            itemMap[pId].children.push(itemMap[id])
        }
    })

    // list.forEach(item => {
    //     itemMap[item.id] = {...item, children:[]}
    // })

    // list.forEach(item => {
    //     const treeItem = itemMap[item.id];
    //     const pItem = itemMap[item.parent_id];

    //     if (pItem) {
    //         pItem.children.push(treeItem)
    //     } else {
    //         res.push(treeItem)
    //     }
    // })
    return res
}