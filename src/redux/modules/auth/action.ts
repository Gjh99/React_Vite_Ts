import {SET_MENU, SET_USERINFO} from "../mutationType";
import {MenuList, userInfoInterface} from "@/redux/interface";
/* UserInfo */
export const setUserInfo = (userInfo:userInfoInterface) => ({
    type: SET_USERINFO,
    userInfo
})
/* Menu */
export const setMenu = (menuList:MenuList[]) => ({
    type: SET_MENU,
    menuList
})
