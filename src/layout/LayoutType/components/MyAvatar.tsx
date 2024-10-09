import React from "react";
import '../DefaultLayout/index.less'
import {Avatar} from "antd";
import reactImg from '@/assets/react.svg'
import './index.less'
function AvatarIcon() {
    return (
        <>
            <div className="avatar flx-align-center">
                <Avatar size="large" src={reactImg} />
                <div className="ml10 nickName">---</div>
            </div>
        </>
    )
}

export default AvatarIcon
