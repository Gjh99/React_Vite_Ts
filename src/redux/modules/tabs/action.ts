import {SET_TABS_ROUTE} from "../mutationType";
import {TabsList} from "@/interfaces/common";
export const setTabsRoute = (tabsRouteArray:TabsList[]) => ({
  type: SET_TABS_ROUTE,
  tabsRouteArray
})
