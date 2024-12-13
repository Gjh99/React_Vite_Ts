export interface TabsList {
    title: string;
    pathName: string;
    key: string;
}
export interface MenuList {
    key: string;
    label: string;
}

export interface GlobalState {
    systemType: string;
    isDarkMode: boolean;
    locale: string;
    showTabs: boolean ,
    showBreadcrumb: boolean;
}

export interface AuthState {
    token?: string | null;
    menuList: MenuList[]
}

interface TabsState {
    tabsRouteArray: TabsList[];
}

export interface RootState {
    tabs?:TabsState;
    global?: GlobalState;
    auth?:AuthState;
}
