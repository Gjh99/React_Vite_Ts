import React from "react";
import '../DefaultLayout/index.less'
import {Avatar, Dropdown} from "antd";
import reactImg from '@/assets/react.svg'
import './index.less'

function AvatarIcon() {
    const userControlsItems = [
        {
            key: '1',
            label: <div>个人信息</div>
        },
        {
            key: '2',
            label: <div>退出登录</div>
        },
    ]
    const handleMenuClick = (e) => {
        if (e.key == 2) {
            console.log(e.key)
        }
    }
    return (
        <>
            <div className="avatar flx-align-center pointer">
                <Dropdown
                    menu={{
                        items: userControlsItems,
                        onClick: handleMenuClick
                    }}
                >
                    <Avatar size="large" src={reactImg}/>
                </Dropdown>
                <div className="ml10 nickName">---</div>
            </div>
        </>
    )
}

export default AvatarIcon
