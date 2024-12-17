import {Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {getMenu} from "@/api/user";
import {useEffect} from "react";
import {connect} from "react-redux";
import {setMenu} from "@/redux/modules/auth/action";
import type {MenuProps} from 'antd';
import {RootState} from "@/redux/interface";
import {PropsInterFace} from "@/interfaces/common";

interface ModeProps {
    mode: string;
};

interface MenuItem {
    path: string;
    menu_name: string;
    icon?: string;
    children?: MenuItem[] | undefined;
}

interface MenuInterface {
    key: string;
    label: string;
    icon?: string;
    children?: MenuInterface[];
}

type MyMenuInterface = Pick<PropsInterFace, 'menuList' | 'setMenu'> & ModeProps;

const MyMenu = (props: MyMenuInterface) => {
    const navigate = useNavigate()
    const location = useLocation()
    let {mode, setMenu, menuList} = {...props}
    const clickMenu: MenuProps['onClick'] = ({key}) => {
        navigate(key);
    };

    const getMenuData = async () => {
        let res = await getMenu();
        let {code} = res;
        if (code == 200) {
            const menuItems = generateMenuItem(res.data)
            setMenu([
                {
                    label: "首页",
                    key: "/home",
                    icon: ""
                },...menuItems])
        }
    }

    useEffect(() => {
        getMenuData()
    }, [])

    const generateMenuItem = (data: MenuItem[]): MenuInterface[] => {
        return data.map(item => {
            const menuItem: MenuInterface = {
                key: item.path,
                label: item.menu_name,
                icon: item.icon,
            };

            if (item.children?.length) {
                menuItem.children = generateMenuItem(item.children);
            } else {
                item.children = undefined
            }

            return menuItem;
        });
    }

    return (
        <>
            <Menu
                mode={mode as 'horizontal' | 'vertical' | 'inline'}
                selectedKeys={[location.pathname]}
                onClick={clickMenu}
                items={menuList}
            />
        </>
    )
}

const mapStateToProps = (state: RootState) => state.auth;

const mapDispatchToProps = {setMenu}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenu)
