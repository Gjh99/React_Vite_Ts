import {SET_LAYOUT_TYPE, SET_THEME, SET_LANGUAGE, SET_TAB, SET_BREADCRUMB} from "../mutationType.ts";

export const setLayout = (globalLayout) => ({
    type: SET_LAYOUT_TYPE,
    globalLayout
})
export const setTheme = (globalTheme) => ({
    type: SET_THEME,
    globalTheme
})
export const setLanguage = (globalLanguage) => ({
    type: SET_LANGUAGE,
    globalLanguage
})

export const setShowTab = (globalShowTabs) => ({
    type: SET_TAB,
    globalShowTabs
})

export const setShowBreadcrumb = (globalShowBread) => ({
    type: SET_BREADCRUMB,
    globalShowBread
})
