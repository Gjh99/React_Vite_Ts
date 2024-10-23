import {SET_TABS_ROUTE} from "../mutationType.ts";

export const setTabsRoute = (tabsRouteArray) => ({
  type: SET_TABS_ROUTE,
  tabsRouteArray
})
