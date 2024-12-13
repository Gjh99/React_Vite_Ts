import Router from "./router";
import {HashRouter} from "react-router-dom";
import {ConfigProvider, theme} from "antd";
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
function App(props: any) {
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
        <HashRouter>
            <ConfigProvider
                locale={i18nLocale}
                theme={{
                    algorithm: props.isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}>
                <AuthRouter>
                    <Router/>
                </AuthRouter>
            </ConfigProvider>
        </HashRouter>
    )
}

const mapStateToProps = (state:RootState) => state.global

const mapDispatchToProps = {setTheme, setLanguage}

export default connect(mapStateToProps, mapDispatchToProps)(App)
