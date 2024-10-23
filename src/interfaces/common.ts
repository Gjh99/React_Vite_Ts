interface TabsList {
    title: string;
    pathName: string;
    key: string;
}

interface PropsInterFace {
    locale: string;
    setLanguage: (lang: string) => void;
    setLayout: (layout: string) => void;
    setTheme: (theme: string) => void;
    TabsList: TabsList[];
    setTabsRoute: (TabsList: TabsList[]) => void;
    showTabs: boolean;
    setShowTab: (Tabs: boolean) => void;
}
