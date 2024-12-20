import Router from "./router";
import {HashRouter} from "react-router-dom";
import {ConfigProvider, theme, App} from "antd";
import zhCN from 'antd/locale/zh_CN';
import enUS from "antd/lib/locale/en_US";
// for date-picker i18n
import 'dayjs/locale/zh-cn';
import {useEffect, useState} from 'react';
import {getBrowserLang} from "./utils";
import i18n from "i18next";
import {setLanguage, setTheme} from "./redux/modules/global/action";
import {connect} from "react-redux";
import AuthRouter from "./router/authRouter";
import {RootState} from "@/redux/interface";

/**
 *         --primary-100:#0077C2;
 *     --primary-200:#59a5f5;
 *     --primary-300:#c8ffff;
 *     --accent-100:#00BFFF;
 *     --accent-200:#00619a;
 *     --text-100:#333333;
 *     --text-200:#5c5c5c;
 *     --bg-100:#FFFFFF;
 *     --bg-200:#f5f5f5;
 *     --bg-300:#cccccc;

 *
 */

const token = {
    colorPrimary: '#0077C2',  // 自定义主色
    colorLink: '#0077C2',     // 自定义链接色
    colorSuccess: '#52c41a',  // 自定义成功色
    colorWarning: '#faad14',  // 自定义警告色
    colorError: '#f5222d',    // 自定义错误色
    colorInfo: '#1890ff',     // 自定义信息色
}

function MyApp(props: any) {
    console.log('props', props)
    let {locale, setLanguage} = props
    const [i18nLocale, seti18nLocale] = useState(zhCN)

    // UI语言
    const setAntdLanguage = () => {
        if (getBrowserLang() === 'zh' || locale == 'zh') {
            return seti18nLocale(zhCN)
        } else {
            return seti18nLocale(enUS)
        }
    }

    useEffect(() => {
        i18n.changeLanguage(locale || getBrowserLang())
        setAntdLanguage()
        setLanguage(locale || getBrowserLang())
    }, [locale])

    return (
        <App className="h100 w100">
            <HashRouter>
                <ConfigProvider
                    locale={i18nLocale}
                    theme={{
                        algorithm: props.isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        token
                    }}>
                    <AuthRouter>
                        <Router/>
                    </AuthRouter>
                </ConfigProvider>
            </HashRouter>
        </App>
    )
}

const mapStateToProps = (state: RootState) => state.global

const mapDispatchToProps = {setTheme, setLanguage}

export default connect(mapStateToProps, mapDispatchToProps)(MyApp)
