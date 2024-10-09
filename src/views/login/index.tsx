
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { setToken } from '@/redux/modules/auth/action'
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const login = () =>{
        navigate('/home')
    }
    return(
        <>
            <div>111111111111</div>
            <Button type="primary" htmlType="submit" onClick={login}>
                {t("login.confirm")}
            </Button>
        </>
    )
}

const mapDispatchToProps = { setToken }

export default connect(null, mapDispatchToProps)(Login)
