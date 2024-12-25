import {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout} from 'antd';
import Logo from "../components/Logo";
import Setting from "../components/Setting";
import AvatarIcon from "../components/MyAvatar";
import MyMenu from "../components/Menu";
import {Outlet} from "react-router-dom";
import './index.less'
import MyTabs from "@/layout/LayoutType/components/Tabs";
import Breadcrumb from "@/layout/LayoutType/components/Breadcrumb";

const {Header, Sider, Content} = Layout;

interface IndexInterface {
    showTabs: boolean;
    showBreadcrumb: boolean;
}

const Index = (props: IndexInterface) => {
    let {showTabs, showBreadcrumb} = props
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="slideLayout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" style={{height: '64px'}}>
                    <Logo collapsed={collapsed}/>
                </div>
                <MyMenu mode={'inline'}/>
            </Sider>
            <Layout>
                <Header className="flx-justify-between">
                    <div className="flx-center h100">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        {
                            showBreadcrumb && <Breadcrumb/>
                        }
                    </div>
                    <div className="mr10 flx-center h100">
                        <Setting/>
                        <AvatarIcon/>
                    </div>
                </Header>
                {
                    showTabs && <MyTabs/>
                }
                <Content style={{overflowY: 'auto'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Index;
