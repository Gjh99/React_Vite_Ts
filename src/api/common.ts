import {get} from "@/utils/request";

export const getCaptcha = async (params?: any) =>{
   const res = await  get('/captcha/img', params)
   return res
}

// export const roleAdd = async (data?: any) =>{
//    const res = await  post('/role/add', data)
//    return res
// }
