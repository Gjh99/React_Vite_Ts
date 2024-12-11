import {get, postFile, post} from "@/utils/request";

export const getMenu = async () =>{
   const res = await  get('/menu')
   return res
}

export const getSystemInterView = async () =>{
   const res = await  get('/systemInterView')
   return res
}

export const getUserInfoList = async (params?: any) =>{
   const res = await  get('/user/infoList', params)
   return res
}

export const uploadUserTemplate = async (data?: any) =>{
   const res = await  postFile('/user/uploadExcel', data)
   return res
}
export const userAdd = async (data?: any) =>{
   const res = await  post('/user/add', data)
   return res
}

export const userEdit = async (data?: any) =>{
   const res = await  post('/user/edit', data)
   return res
}

export const userDelete = async (data?: any) =>{
   const res = await  post('/user/delete', data)
   return res
}

export const getDictDataList = async (params?: any) =>{
   const res = await  get('/dict/dictDataList', params)
   return res
}
