import {SET_LAYOUT_TYPE, SET_THEME, SET_LANGUAGE, SET_TAB, SET_BREADCRUMB} from "../mutationType";

export const setLayout = (globalLayout: string) => ({
    type: SET_LAYOUT_TYPE,
    globalLayout
})
export const setTheme = (globalTheme: boolean) => ({
    type: SET_THEME,
    globalTheme
})
export const setLanguage = (globalLanguage: string) => ({
    type: SET_LANGUAGE,
    globalLanguage
})

export const setShowTab = (globalShowTabs: boolean) => ({
    type: SET_TAB,
    globalShowTabs
})

export const setShowBreadcrumb = (globalShowBread: boolean) => ({
    type: SET_BREADCRUMB,
    globalShowBread
})
