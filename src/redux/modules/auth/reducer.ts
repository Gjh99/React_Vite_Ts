import {produce} from "immer";
import {SET_TOKEN,SET_MENU} from "../mutationType.ts";
import {AuthState  as AuthStateType} from '@/redux/interface/index.ts'

const authState:AuthStateType = {
    token: '1',
    menuList: []
}

const auth = (state = authState, action) => {
    return produce(state, draftState => {
        switch (action.type) {
            case SET_TOKEN:
                draftState.token = action.token
                break;
            case SET_MENU:
                console.log('menuList', action)
                draftState.menuList = action.menu
                break;
            default:
                break;
        }
    })
}

export default auth
