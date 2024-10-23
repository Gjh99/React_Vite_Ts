import {setTabsRoute} from "../redux/modules/tabs/action.ts";

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
    TabsList: TabsList[]
    setTabsRoute: (TabsList: TabsList[]) => void;
}
