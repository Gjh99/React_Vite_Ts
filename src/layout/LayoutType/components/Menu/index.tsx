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
            setMenu(res.data)
            console.log('res', props)
        }
    }

    useEffect(() => {
        getMenuData()
    }, [])

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
