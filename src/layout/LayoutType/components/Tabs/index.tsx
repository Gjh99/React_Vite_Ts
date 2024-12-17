import {useEffect, useState} from "react";
import {Tabs} from 'antd';
import './index.less'
import {useLocation} from "react-router";
import {rootRouter} from "@/router";
import {searchRoute} from "@/utils";
import {setTabsRoute} from "../../../../redux/modules/tabs/action"
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState, TabsList} from "@/redux/interface";
import {PropsInterFace} from "@/interfaces/common";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type MyTabsInterface = Pick<PropsInterFace, 'tabsRouteArray' | 'setTabsRoute'>

const MyTabs = (props: MyTabsInterface) => {
    let {tabsRouteArray, setTabsRoute} = props
    // const [defaultTabsList, setTabsList] = useState([...tabsRouteArray])
    const [activeKey, setActiveKey] = useState<string>();
    // const [setTabItems] = useState(tabsRouteArray);
    const {pathname} = useLocation()
    const route = searchRoute(pathname, rootRouter);
    const navigate = useNavigate()
    const generateKey = (pathName: string) => `${pathName}-${Math.random()}`;

    const handleTabList = (prevTabsList: TabsList[], title: string, pathName: string) => {
        const isPathInTabs = prevTabsList.some(tab => tab.pathName === pathName);
        if (isPathInTabs) {
            return prevTabsList;
        }
        const newTab = {
            title,
            pathName,
            key: generateKey(pathName)
        }
        setTabsRoute([...prevTabsList, newTab])
        return [...prevTabsList, newTab]
    };

    useEffect(() => {
        let {meta} = route
        const currentPath = pathname;
        const tabTitle = currentPath === '/home' ? '首页' : `${meta.title}`;
        const newTabsList = handleTabList(tabsRouteArray, tabTitle, currentPath);
        const activeTab = newTabsList.find(tab => tab.pathName === pathname);
        setActiveKey(activeTab?.key)

    }, [pathname]);

    useEffect(()=>{
        return () =>{
            console.log('页面销毁')
            setTabsRoute([])
        }
    }, [])

    const processedTabsList = tabsRouteArray.map(({title, pathName, key}) => ({
        label: title,
        pathName,
        key,
        closable: pathName !== '/home',
    }));

    const onChange = (activeKey: string) => {
        const nowPanes = tabsRouteArray.find(tab => tab.key === activeKey);
        if (nowPanes) {
            navigate(nowPanes.pathName)
        }
        setActiveKey(nowPanes?.key);
    };

    const remove = (targetKey: TargetKey) => {
        const nowPanes = tabsRouteArray.filter((pane) => pane.key !== targetKey);
        if (nowPanes.length > 0) {
            navigate(nowPanes[nowPanes.length - 1].pathName)
            // setTabsList([...nowPanes])
            setTabsRoute([...nowPanes])
        }
    };

    const onEdit = (targetKey: TargetKey) => {
        remove(targetKey);
    };

    return (
        <div className="MyTabs">
            <Tabs
                hideAdd
                size={"small"}
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
                items={processedTabsList}
            />
        </div>
    )

}

const mapStateToProps = (state: RootState) => ({
    tabsRouteArray: state.tabs?.tabsRouteArray || []
})

const mapDispatchToProps = {setTabsRoute}

export default connect(mapStateToProps, mapDispatchToProps)(MyTabs)
