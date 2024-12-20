import {get, post} from "@/utils/request";

export const getRoleList = async (params?: any) =>{
   const res = await  get('/role/list', params)
   return res
}
export const getAllMenu = async (params?: any) =>{
   const res = await  get('/menu/getAllMenu', params)
   return res
}

export const roleAdd = async (data?: any) =>{
   const res = await  post('/role/add', data)
   return res
}

export const roleEdit = async (data?: any) =>{
   const res = await  post('/role/edit', data)
   return res
}

export const roleDel = async (data?: any) =>{
   const res = await  post('/role/del', data)
   return res
}
