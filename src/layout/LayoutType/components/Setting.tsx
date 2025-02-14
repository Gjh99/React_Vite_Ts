import {useEffect, useState} from "react";
import {SettingOutlined} from '@ant-design/icons';
import {Card, Divider, Drawer, Flex, Switch} from 'antd'
import {
    setLayout,
    setShowBreadcrumb,
    setShowTab,
    setTheme
} from "../../../redux/modules/global/action"
import {connect} from "react-redux";
import './index.less'
import DefaultLayout from '@/assets/image/DefaultLayout.png'
import SlideLayout from '@/assets/image/SlideLayout.png'
import TopLayout from '@/assets/image/TopLayout.png'
import {RootState} from "@/redux/interface";
import {PropsInterFace} from "@/interfaces/common";

const {Meta} = Card;

type SettingInterface = Pick<PropsInterFace, 'systemType' | 'setLayout' | 'isDarkMode'
    | 'setTheme' | 'showTabs' | 'setShowTab' | 'showBreadcrumb' | 'setShowBreadcrumb'>
const Setting = (props: SettingInterface) => {
    let {systemType, setLayout, setTheme, isDarkMode, setShowTab, showTabs, setShowBreadcrumb, showBreadcrumb} = props
    const [drawerOpen, setDrawerOpen] = useState(false)
    console.log('type', props)
    const showSetting = () => {
        setDrawerOpen(true)
    }

    const onClose = () => {
        setDrawerOpen(false)
    }

    const [layoutStyleImg] = useState([
        {
            image: DefaultLayout,
            name: 'DefaultLayout'
        },
        {
            image: SlideLayout,
            name: 'SlideLayout'
        },
        {
            image: TopLayout,
            name: 'TopLayout'
        },
    ])

    const onChangeDark = () => {
        setTheme(!isDarkMode)
        if (isDarkMode) {
            document.body.setAttribute("system-theme", 'dark')
        } else {
            document.body.setAttribute("system-theme", 'light')
        }
    }
    const onChangeTab = () => {
        setShowTab(!showTabs)
    }
    const onChangeTabBreadcrumb = () => {
        setShowBreadcrumb(!showBreadcrumb)
    }

    useEffect(() => {
        if (isDarkMode) {
            document.body.setAttribute("system-theme", 'dark')
        } else {
            document.body.setAttribute("system-theme", 'light')
        }
    }, [isDarkMode]);

    return (
        <>
            <div className="setting flx-center h100 pointer" onClick={showSetting}>
                <SettingOutlined className="settingIcon"/>
            </div>
            <Drawer title="设置" onClose={onClose} open={drawerOpen} closeIcon={false}>
                <Divider variant="dashed" style={{borderColor: '#333'}} dashed>
                    <div className="fontW fontSize20">
                        主题样式
                    </div>
                </Divider>
                <div className="layoutList">
                    {
                        layoutStyleImg.map((item, index) => {
                            return (
                                <Card key={index} className={`pointer ${systemType == item.name ? 'layoutActive' : ''}`}
                                      onClick={() => setLayout(item.name)} hoverable={true}
                                      cover={<img src={item.image}/>}
                                >
                                    <Meta title={item.name} style={{textAlign: "center"}}/>
                                </Card>
                            )
                        })
                    }
                </div>
                <Divider variant="dashed" style={{borderColor: '#333'}} dashed>
                    <div className="fontW fontSize20">
                        主题颜色
                    </div>
                </Divider>
                <Flex align="center">
                    <div className="fontSize18 fontW mr20">暗黑模式</div>
                    <Switch defaultChecked onChange={onChangeDark} checked={isDarkMode}/>
                </Flex>
                <Divider variant="dashed" style={{borderColor: '#333'}} dashed>
                    <div className="fontW fontSize20">
                        标签栏
                    </div>
                </Divider>
                <Flex align="center">
                    <div className="fontSize18 fontW mr20">是否显示</div>
                    <Switch defaultChecked onChange={onChangeTab} checked={showTabs}/>
                </Flex>
                <Divider variant="dashed" style={{borderColor: '#333'}} dashed>
                    <div className="fontW fontSize20">
                        面包屑导航
                    </div>
                </Divider>
                <Flex align="center">
                    <div className="fontSize18 fontW mr20">是否显示</div>
                    <Switch defaultChecked onChange={onChangeTabBreadcrumb} checked={showBreadcrumb}/>
                </Flex>
            </Drawer>
        </>
    )
}

const mapStateToProps = (state: RootState) => state.global

const mapDispatchToProps = {setLayout, setTheme, setShowTab, setShowBreadcrumb}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
