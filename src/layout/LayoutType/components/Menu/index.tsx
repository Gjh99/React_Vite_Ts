import {Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

const MyMenu = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    let {mode} = {...props}
    console.log(mode)
    const clickMenu = ({ key }) => {
        console.log('key', key)
        // const route = searchRoute(key, props.menuList);
        // if (route.isLink) window.open(route.isLink, "_blank");
        navigate(key);
    };
    return (
        <>
            <Menu
                mode={mode}
                selectedKeys={[location.pathname]}
                onClick={clickMenu}
                items={[
                    {
                        key: '/home',
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
        </>
    )
}

export default MyMenu
