import {produce} from "immer";
import {SET_LANGUAGE, SET_LAYOUT_TYPE, SET_THEME} from "../mutationType.ts";
import {GlobalState} from '@/redux/interface/index.ts'

const globalState:GlobalState = {
    type: 'DefaultLayout',
    isDarkMode: false,
    locale: 'zh'
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
            default:
                break;
        }
    })

export default global
