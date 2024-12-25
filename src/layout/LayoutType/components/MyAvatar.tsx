import '../DefaultLayout/index.less'
import {Avatar, Dropdown, message, Modal} from "antd";
import reactImg from '@/assets/react.svg'
import './index.less'
import {logout} from "@/api/user";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {removeToken} from "@/utils/cookie";
import {RootState} from "@/redux/interface";
import {useSelector} from "react-redux";
import {store} from "@/redux";
import {setTabsRoute} from "@/redux/modules/tabs/action";

function AvatarIcon() {
    const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const handleMenuClick = (e: any) => {
        if (e.key == 2) {
            setIsModalOpen(true)
        }
    }

    const logoutFn = async () => {
        let res = await logout()
        let {code, msg} = res
        if (code == 200) {
            // @ts-ignore
            store.dispatch(setTabsRoute([{ title: '首页', pathName: '/home', key: '1' }]));
            removeToken()
            localStorage.clear()
            navigate('/login')
        } else {
            message.error(msg)
        }
    }

    useEffect(() => {
        console.log('auth-------------------', userInfo)
    }, []);
    return (
        <>
            <Avatar size="large" src={reactImg}/>
            <div className="avatar flx-align-center pointer">
                <Dropdown
                    menu={{
                        items: userControlsItems,
                        onClick: handleMenuClick
                    }}
                >
                    <div className="ml10 nickName fontSize16">你好，{userInfo?.nick_name}</div>
                </Dropdown>
            </div>

            <Modal
                title="提示"
                open={isModalOpen}
                centered
                okText="确定"
                cancelText="取消"
                okButtonProps={{htmlType: 'submit'}}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => logoutFn()}
                destroyOnClose
                width={400}
            >
                <div className="fontSize18 mt20 mb20">
                    是否退出登录？
                </div>
            </Modal>
        </>
    )
}

export default AvatarIcon
