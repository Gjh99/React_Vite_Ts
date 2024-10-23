import {useEffect, useState} from "react";
import {Tabs} from 'antd';
import './index.less'
import {useLocation} from "react-router";
import {rootRouter} from "@/router";
import {searchRoute} from "@/utils";
import {setTabsRoute} from "../../../../redux/modules/tabs/action"
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const MyTabs = (props: PropsInterFace) => {
    let {tabsRouteArray, setTabsRoute} = props
    const [defaultTabsList, setTabsList] = useState([...tabsRouteArray])
    const [activeKey, setActiveKey] = useState();
    // const [setTabItems] = useState(tabsRouteArray);
    const {pathname} = useLocation()
    const route = searchRoute(pathname, rootRouter);
    const navigate = useNavigate()
    const generateKey = (pathName) => `${pathName}-${Math.random()}`;

    const handleTabList = (prevTabsList, title, pathName) => {
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
        const newTabsList = handleTabList(defaultTabsList, tabTitle, currentPath);
        const nowActiveTabsItem = newTabsList.filter(item => item.pathName == currentPath)

        setActiveKey(nowActiveTabsItem[0].key)
        setTabsList(newTabsList)
    }, [pathname]);

    const processedTabsList = defaultTabsList.map(({title, pathName, key}) => ({
        label: title,
        pathName,
        key,
        closable: pathName !== '/home',
    }));

    const onChange = (activeKey) => {
        const nowPanes = defaultTabsList.filter((pane) => pane.key == activeKey);
        navigate(nowPanes[0].pathName)
        setActiveKey(nowPanes[0].key);
    };

    const remove = (targetKey: TargetKey) => {
        const nowPanes = defaultTabsList.filter((pane) => pane.key !== targetKey);
        if (nowPanes.length > 0) {
            navigate(nowPanes[nowPanes.length - 1].pathName)
            setTabsList([...nowPanes])
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

const mapStateToProps = (state) => state.tabs

const mapDispatchToProps = {setTabsRoute}

export default connect(mapStateToProps, mapDispatchToProps)(MyTabs)
