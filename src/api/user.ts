import {get} from "@/utils/request";

export const getMenu = async () =>{
   const res = await  get('/menu')
   return res
}
export const getSystemInterView = async () =>{
   const res = await  get('/systemInterView')
   return res
}
