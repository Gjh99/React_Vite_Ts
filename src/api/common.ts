import {get} from "@/utils/request";

export const getCaptcha = async (params?: any) =>{
   const res = await  get('/captcha/img', params)
   return res
}

export const getLogList = async (params?: any) =>{
   const res = await  get('/monitor/LogList', params)
   return res
}
