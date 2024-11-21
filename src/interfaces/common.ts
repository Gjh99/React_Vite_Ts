import {TabsList, MenuList} from "@/redux/interface";

export interface PropsInterFace {
    systemType: string;
    locale: string;
    setLanguage: (lang: string) => void;
    setLayout: (layout: string) => void;
    isDarkMode: boolean;
    setTheme: (theme: boolean) => void;
    showBreadcrumb: boolean;
    setShowBreadcrumb: (globalShowBread: boolean) => void;
    TabsList: TabsList[];
    tabsRouteArray: TabsList[];
    setTabsRoute: (TabsList: TabsList[]) => void;
    menuList: TabsList[];
    setMenu: (TabsList: MenuList[]) => void;
    showTabs: boolean;
    setShowTab: (Tabs: boolean) => void;
}
