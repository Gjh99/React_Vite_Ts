import {produce} from "immer";
import {SET_TOKEN} from "../mutationType.ts";
import {AuthState  as AuthStateType} from '@/redux/interface/index.ts'

const authState:AuthStateType = {
    token: ''
}

const auth = (state = authState, action) => {
    return produce(state, draftState => {
        switch (action.type) {
            case SET_TOKEN:
                draftState.token = action.token
                break;
            default:
                break;
        }
    })
}

export default auth
