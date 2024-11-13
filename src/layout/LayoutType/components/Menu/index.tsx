import {Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {getMenu} from "../../../../api/user.ts";
import {useEffect} from "react";
import { connect } from "react-redux";
import {setMenu} from "../../../../redux/modules/auth/action.ts";

const MyMenu = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    let {mode, setMenu, menuList} = {...props}
    const clickMenu = ({key}) => {
        console.log('key', key)
        // const route = searchRoute(key, props.menuList);
        // if (route.isLink) window.open(route.isLink, "_blank");
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
                mode={mode}
                selectedKeys={[location.pathname]}
                onClick={clickMenu}
                items={menuList}
            />
        </>
    )
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = {setMenu}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenu)
