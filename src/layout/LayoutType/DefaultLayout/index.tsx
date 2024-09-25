import {Layout, TimePicker} from "antd";
import React from 'react';
import './index.less'
import Logo from "../components/Logo.tsx";
import AvatarIcon from "../components/MyAvatar.tsx";
import Setting from "../components/Setting.tsx";

const {Header, Content} = Layout

function Index() {
    return (
        <>
            <Layout>
                <Header className="flx-justify-between">
                    <Logo/>
                    <div className="mr10 flx-center h100">
                        <Setting/>
                        <AvatarIcon/>
                    </div>
                </Header>

                <Layout>
                    <TimePicker />
                    {/*<Sider trigger={null} collapsible collapsed={collapsed}>*/}
                    {/*    <Menu*/}
                    {/*        theme="dark"*/}
                    {/*        mode="inline"*/}
                    {/*        defaultSelectedKeys={['1']}*/}
                    {/*        items={[*/}
                    {/*            {*/}
                    {/*                key: '1',*/}
                    {/*                icon: <UserOutlined/>,*/}
                    {/*                label: 'nav 1',*/}
                    {/*            },*/}
                    {/*            {*/}
                    {/*                key: '2',*/}
                    {/*                icon: <VideoCameraOutlined/>,*/}
                    {/*                label: 'nav 2',*/}
                    {/*            },*/}
                    {/*            {*/}
                    {/*                key: '3',*/}
                    {/*                icon: <UploadOutlined/>,*/}
                    {/*                label: 'nav 3',*/}
                    {/*            },*/}
                    {/*        ]}*/}
                    {/*    />*/}
                    {/*</Sider>*/}
                    <Layout>
                        <Content>
                            {/*Content*/}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default Index
