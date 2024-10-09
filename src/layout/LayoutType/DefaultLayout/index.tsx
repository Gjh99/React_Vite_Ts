import {Layout} from "antd";
import React from 'react';
import './index.less'
import Logo from "../components/Logo.tsx";
import AvatarIcon from "../components/MyAvatar.tsx";
import Setting from "../components/Setting.tsx";
import {Outlet} from "react-router-dom";
import Language from "../components/Language.tsx";
import MyMenu from "../components/Menu";

const {Header, Content, Sider} = Layout

function Index() {
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
                        <MyMenu mode={'inline'}/>
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
