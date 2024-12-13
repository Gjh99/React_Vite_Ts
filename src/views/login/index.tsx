import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {Button, Col, Form, FormProps, Input, message, Row} from "antd";
import "./index.less"
import loginImg from "@/assets/image/login.svg"
import {useNavigate} from "react-router-dom";
import {UnlockOutlined, UserOutlined} from "@ant-design/icons";
import {getCaptcha} from "@/api/common";
import {useEffect, useState} from "react";
import {login} from "@/api/user";
import {setToken} from "@/utils/cookie";
import {setUserInfo} from "@/redux/modules/auth/action";
import {PropsInterFace} from "@/interfaces/common";

type FieldType = {
    user_name?: string;
    password?: string;
    captcha?: string;
};
type MyUserInfoInterface = Pick<PropsInterFace, 'setUserInfo'>

const Login = (props: MyUserInfoInterface) => {
    let {setUserInfo} = props
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [captcha, setCaptcha] = useState('')
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        let res = await login(values);
        let {code, msg, data} = res
        if (code == 200) {
            console.log(data)
            setToken(data.token)
            setUserInfo(data.userInfo)
            navigate('/home')
        } else {
            message.error(msg)
        }
    };

    const getCaptchaFn = async () => {
        try {
            let res = await getCaptcha();
            let {code, data} = res
            if (code == 200) {
                setCaptcha(data.captcha)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCaptchaFn()
    }, []);

    return (
        <div className="h100 w100 login_box">
            <Row className="h100">
                <Col span={16}>
                    <div className="login_img h100 flx-center flex-direction">
                        <img className="img" src={loginImg}/>
                        <div className="text mt10">
                            React+Ts+Node架构项目
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="login_form h100 flx-center flex-direction">
                        <div className="fontW fontSize24 mb20">登录</div>
                        <div className="login_form_box">
                            <Form
                                name="basic"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}
                                onFinish={onFinish}
                                autoComplete="off"
                                size="large"
                                initialValues={{
                                    user_name: 'admin',
                                    password: '123456',
                                }}
                            >
                                <Form.Item<FieldType>
                                    label={null}
                                    name="user_name"
                                    rules={[{required: true, message: '请输入账号！'}]}
                                >
                                    <Input placeholder={"请输入账号"} prefix={<UserOutlined/>}/>
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label={null}
                                    name="password"
                                    rules={[{required: true, message: '请输入密码！'}]}
                                >
                                    <Input.Password placeholder={"请输入密码"} prefix={<UnlockOutlined/>}/>
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label={null}
                                    name="captcha"
                                    rules={[{required: true, message: '请输入验证码！'}]}
                                >
                                    <Input placeholder={"请输入验证码"}/>
                                </Form.Item>

                                <Form.Item label={null}>
                                    <div className="flx-align-center">
                                        <img src={captcha} alt=""/>
                                        <div className="ml10 pointer" onClick={getCaptchaFn}>看不清楚，换一张</div>
                                    </div>
                                </Form.Item>

                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                        {t("login.confirm")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapDispatchToProps = {setUserInfo}

export default connect(null, mapDispatchToProps)(Login)
