import {Layout, Menu} from "antd";
import React from 'react';
import './index.less'
import Logo from "../components/Logo.tsx";
import AvatarIcon from "../components/MyAvatar.tsx";
import Setting from "../components/Setting.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Language from "../components/Language.tsx";

const {Header, Content, Sider} = Layout

function Index() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log('useLocation', location)
    const clickMenu = ({ key }) => {
        console.log('key', key)
        // const route = searchRoute(key, props.menuList);
        // if (route.isLink) window.open(route.isLink, "_blank");
        navigate(key);
    };
    return (
        <>
            <Layout>
                <Header className="flx-justify-between">
                    <Logo/>
                    <div className="mr10 flx-center h100">
                        <Language/>
                        <Setting/>
                        <AvatarIcon/>
                    </div>
                </Header>

                <Layout>
                    <Sider trigger={null}>
                        <Menu
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            onClick={clickMenu}
                            items={[
                                {
                                    key: '/',
                                    label: '首页',
                                },
                                {
                                    key: '2',
                                    label: 'nav 2',
                                },
                                {
                                    key: '3',
                                    label: 'nav 3',
                                },
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Content>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default Index
