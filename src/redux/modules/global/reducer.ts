import {produce} from "immer";
import {SET_LANGUAGE, SET_LAYOUT_TYPE, SET_THEME, SET_TAB, SET_BREADCRUMB} from "../mutationType";
import {GlobalState} from '@/redux/interface/index';
interface SetLayoutAction {
    type: typeof SET_LAYOUT_TYPE;
    globalLayout: string;
}

interface SetThemeAction {
    type: typeof SET_THEME;
    globalTheme: boolean;
}

interface SetLanguageAction {
    type: typeof SET_LANGUAGE;
    globalLanguage: string;
}

interface SetTabAction {
    type: typeof SET_TAB;
    globalShowTabs: boolean;
}

interface SetBreadcrumbAction {
    type: typeof SET_BREADCRUMB;
    globalShowBread: boolean;
}

type GlobalAction =
    | SetLayoutAction
    | SetThemeAction
    | SetLanguageAction
    | SetTabAction
    | SetBreadcrumbAction;

const globalState:GlobalState = {
    systemType: 'DefaultLayout',
    isDarkMode: false,
    locale: 'zh',
    showTabs: true,
    showBreadcrumb: true
}

const global = (state = globalState, action:GlobalAction) =>
    produce(state, draftState => {
        switch (action.type) {
            case SET_LAYOUT_TYPE:
                draftState.systemType = action.globalLayout
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
