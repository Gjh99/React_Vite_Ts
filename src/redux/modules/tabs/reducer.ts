import {produce} from "immer";
import {SET_TABS_ROUTE} from "../mutationType";
import {TabsList} from "@/redux/interface";
interface TabsState {
    tabsRouteArray: TabsList[];
}
interface SetTabsRouteAction {
    type: typeof SET_TABS_ROUTE;
    tabsRouteArray: TabsList[];
}

const tabState:TabsState =  {
    tabsRouteArray: [{title: '首页', pathName: '/home', key: '1'}]
}

const tabs = (state: TabsState = tabState, action:SetTabsRouteAction) =>
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
