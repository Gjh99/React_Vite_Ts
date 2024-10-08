import React from "react";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd'
import {setLanguage, setLayout, setTheme} from "../../../redux/modules/global/action"
import {connect} from "react-redux";
import './index.less'

function Setting(props: PropsInterFace) {
    let {locale, setLanguage} = props
    const LanguageItems: MenuProps['items'] = [
        {
            key: "1",
            label: <div>简体中文</div>,
            disabled: locale === "zh"
        },
        {
            key: "2",
            label: <div>English</div>,
            disabled: locale === "en"
        }
    ]

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '1') {
            setLanguage("zh");
        } else if (e.key === '2') {
            setLanguage("en");
        }
    };

    return (
        <>
            <div className="setting flx-center h100 pointer">
                <Dropdown menu={{
                    items: LanguageItems,
                    onClick: handleMenuClick
                }}>
                    {/*<a onClick={(e) => e.preventDefault()}>*/}
                        <i className="iconfont icon-erqi fontSize24"></i>
                    {/*</a>*/}
                </Dropdown>
            </div>
        </>
    )
}

const mapStateToProps = (state) => state.global

const mapDispatchToProps = {setLayout, setTheme, setLanguage}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
