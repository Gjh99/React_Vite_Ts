import {Layout} from "antd";
import React from 'react';
import './index.less'
import AvatarIcon from "../components/MyAvatar.tsx";
import Setting from "../components/Setting.tsx";
import {Outlet} from "react-router-dom";
import Language from "../components/Language.tsx";
import Logo from "../components/Logo.tsx";
import MyMenu from "../components/Menu";
import MyTabs from "../components/Tabs";
import Breadcrumb from "../components/Breadcrumb";
import PropTypes from 'prop-types';

const {Header, Content, Sider} = Layout

function Index({showTabs, showBreadcrumb}) {
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
                        <Content>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

Index.propTypes = {
    showTabs: PropTypes.bool.isRequired,
    showBreadcrumb: PropTypes.bool.isRequired,
};
export default Index
