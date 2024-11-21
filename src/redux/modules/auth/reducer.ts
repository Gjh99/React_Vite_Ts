import {produce} from "immer";
import {SET_TOKEN, SET_MENU} from "../mutationType";
import {AuthState as AuthStateType, MenuList} from '@/redux/interface/index'

interface SetToken {
    type: typeof SET_TOKEN;
    token: string;
}

interface SetMenu {
    type: typeof SET_MENU;
    menuList: MenuList[]
}

type AuthAction = SetToken | SetMenu

const authState: AuthStateType = {
    token: '1',
    menuList: []
}

const auth = (state = authState, action: AuthAction) => {
    return produce(state, draftState => {
        switch (action.type) {
            case SET_TOKEN:
                draftState.token = action.token
                break;
            case SET_MENU:
                draftState.menuList = action.menuList
                break;
            default:
                break;
        }
    })
}

export default auth
