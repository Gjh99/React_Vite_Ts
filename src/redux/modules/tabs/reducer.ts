import {produce} from "immer";
import {SET_TABS_ROUTE} from "../mutationType.ts";

const tabState =  {
    tabsRouteArray: [{title: '首页', pathName: '/home', key: '1'}]
}

const tabs = (state = tabState, action) =>
    produce(state, draftState => {
        switch (action.type) {
            case SET_TABS_ROUTE:
                draftState.tabsRouteArray = action.tabsRouteArray
                break;
            default:
                break;
        }
    })
export default tabs
