import { SET_MENU } from "../mutationType";
import {MenuList} from "@/redux/interface";
/* Token */
// export const setToken = (token:string) => ({
//     type: SET_TOKEN,
//     token
// })
/* Token */
export const setMenu = (menuList:MenuList[]) => ({
    type: SET_MENU,
    menuList
})
