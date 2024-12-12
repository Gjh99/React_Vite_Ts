import {produce} from "immer";
import {SET_MENU} from "../mutationType";
import {AuthState as AuthStateType, MenuList} from '@/redux/interface/index'
import {getToken} from "@/utils/cookie";

// interface SetToken {
//     type: typeof SET_TOKEN;
//     token: string;
// }

interface SetMenu {
    type: typeof SET_MENU;
    menuList: MenuList[]
}

 type AuthAction = SetMenu

const authState: AuthStateType = {
    token: getToken(),
    menuList: []
}

const auth = (state = authState, action: AuthAction) => {
    return produce(state, draftState => {
        switch (action.type) {
            // case SET_TOKEN:
            //     draftState.token = action.token
            //     break;
            case SET_MENU:
                draftState.menuList = action.menuList
                break;
            default:
                break;
        }
    })
}

export default auth
