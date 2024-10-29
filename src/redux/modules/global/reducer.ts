import {produce} from "immer";
import {SET_LANGUAGE, SET_LAYOUT_TYPE, SET_THEME,SET_TAB,SET_BREADCRUMB} from "../mutationType.ts";
import {GlobalState} from '@/redux/interface/index.ts'

const globalState:GlobalState = {
    type: 'DefaultLayout',
    isDarkMode: false,
    locale: 'zh',
    showTabs: true,
    showBreadcrumb: true
}

const global = (state = globalState, action) =>
    produce(state, draftState => {
        switch (action.type) {
            case SET_LAYOUT_TYPE:
                draftState.type = action.globalLayout
                break;
            case SET_THEME:
                draftState.isDarkMode = action.globalTheme
                break;
            case SET_LANGUAGE:
                draftState.locale = action.globalLanguage
                break;
            case SET_TAB:
                draftState.showTabs = action.globalShowTabs
                break;
            case SET_BREADCRUMB:
                draftState.showBreadcrumb = action.globalShowBread
                break;
            default:
                break;
        }
    })

export default global
