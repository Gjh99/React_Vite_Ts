import {Layout} from 'antd';
import Logo from "../components/Logo";
import Setting from "../components/Setting";
import AvatarIcon from "../components/MyAvatar";
import MyMenu from "@/layout/LayoutType/components/Menu";
import Breadcrumb from "@/layout/LayoutType/components/Breadcrumb";
import {Outlet} from "react-router-dom";
import './index.less'
import Language from "@/layout/LayoutType/components/Language";

const {Header, Content, Footer} = Layout;

interface IndexInterface {
    showTabs: boolean;
    showBreadcrumb: boolean;
}

const Index = (props: IndexInterface) => {
    let {showBreadcrumb} = props

    return (
        <Layout className="topLayout">
            <Header className="flx-justify-between">
                <Logo/>
                <div className="menu">
                    <MyMenu mode={'horizontal'}/>
                </div>
                <div className="mr10 flx-center h100">
                    <Language/>
                    <Setting/>
                    <AvatarIcon/>
                </div>
            </Header>
            <div className="breadcrumb mt10 mb10">
                {
                    showBreadcrumb && <Breadcrumb/>
                }
            </div>
            <Content style={{padding: '0 48px', overflowY: 'auto'}}>
                <Outlet/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                React & NodeServer ©{new Date().getFullYear()} Created by $
            </Footer>
        </Layout>
    );
};

export default Index;
