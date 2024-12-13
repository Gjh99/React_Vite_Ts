import {produce} from "immer";
import {SET_MENU, SET_USERINFO} from "../mutationType";
import {AuthState as AuthStateType, MenuList, userInfoInterface} from '@/redux/interface/index'

interface SetUserInfo {
    type: typeof SET_USERINFO;
    userInfo: userInfoInterface;
}

interface SetMenu {
    type: typeof SET_MENU;
    menuList: MenuList[]
}

type AuthAction = SetMenu | SetUserInfo

const authState: AuthStateType = {
    userInfo: {
        id: null,
        user_name: '',
        nick_name: '',
        user_age: '',
        user_sex: '',
        role: null
    },
    menuList: []
}

const auth = (state = authState, action: AuthAction) => {
    return produce(state, draftState => {
        switch (action.type) {
            case SET_USERINFO:
                console.log('设置值')
                draftState.userInfo = action.userInfo
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
