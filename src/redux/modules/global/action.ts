import {SET_LAYOUT_TYPE, SET_THEME, SET_LANGUAGE} from "../mutationType.ts";

export const setLayout = (globalLayout)=>({
    type: SET_LAYOUT_TYPE,
    globalLayout
})
export const setTheme = (globalTheme)=>({
    type: SET_THEME,
    globalTheme
})
export const setLanguage = (globalLanguage)=>({
    type: SET_LANGUAGE,
    globalLanguage
})
