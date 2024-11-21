import {Layout} from "antd";
import './index.less'
import AvatarIcon from "../components/MyAvatar";
import Setting from "../components/Setting";
import {Outlet} from "react-router-dom";
import Language from "../components/Language";
import Logo from "../components/Logo";
import MyMenu from "../components/Menu";
import MyTabs from "../components/Tabs";
import Breadcrumb from "../components/Breadcrumb";

const {Header, Content, Sider} = Layout
interface IndexInterface {
    showTabs: boolean;
    showBreadcrumb: boolean;
}
const Index = (props:IndexInterface) => {
    let {showTabs, showBreadcrumb} = props
    return (
        <>
            <Layout>
                <Header className="flx-justify-between">
                    <div className="flx-center h100">
                        <Logo/>
                        {
                            showBreadcrumb && <Breadcrumb/>
                        }
                    </div>
                    <div className="mr10 flx-center h100">
                        <Language/>
                        <Setting/>
                        <AvatarIcon/>
                    </div>
                </Header>

                <Layout>
                    <Sider trigger={null}>
                        <MyMenu mode={'inline'}/>
                    </Sider>
                    <Layout>
                        {
                            showTabs && <MyTabs/>
                        }
                        <Content style={{overflowY:'auto'}}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default Index
