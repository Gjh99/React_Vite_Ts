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
    showTabs: boolean,
    showBreadcrumb: boolean;
}

export interface userInfoInterface {
    id: number | null;
    user_name: string;
    nick_name: string;
    user_age: string;
    user_sex: string;
    role: any;
}

export interface AuthState {
    userInfo: userInfoInterface | undefined
    menuList: MenuList[]
}

interface TabsState {
    tabsRouteArray: TabsList[];
}

export interface RootState {
    tabs?: TabsState;
    global?: GlobalState;
    auth?: AuthState;
}
