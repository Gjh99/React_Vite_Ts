import { SET_TOKEN, SET_MENU } from "../mutationType.ts";
/* Token */
export const setToken = (token) => ({
    type: SET_TOKEN,
    token
})
/* Token */
export const setMenu = (menu) => ({
    type: SET_MENU,
    menu
})
