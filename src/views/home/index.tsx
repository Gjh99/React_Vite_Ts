import {Avatar, Card, Col, Row} from "antd";
import React, {useEffect, useRef, useState} from "react";
import reactImg from '@/assets/react.svg';
import EChart from "../../component/Echart.tsx";
import './index.less';
import {getSystemInterView} from "../../api/user.ts";

function home() {
    const homeRef = useRef(null);

    const [systemData, setSystemData] = useState([
        {
            label: '用户人数',
            icon: 'icon-tuandui',
            text: '上月新增用户数',
            color: '#4c4cf5',
            num: null
        },
        {
            label: '访问量',
            icon: 'icon-yonghufangwenliang',
            text: '上月累计访问量',
            color: '#f12020',
            num: null
        },
        {
            label: '在线人数',
            icon: 'icon-zaixianrenshu',
            text: '上月累计在线人数',
            color: '#4c4cf5',
            num: null
        },
    ])

    const [userOption, setUserOption] = useState({
        xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {},
        series: [{
            name: '用户数',
            type: 'bar',
            data: null
        }]
    });
    const [lineOption,setLineOption] = useState({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '访问量',
            type: 'line',
            data: null,
            areaStyle: {}
        }]
    });

    const getSyetemData = async () => {
        let res = await getSystemInterView();
        let {code, data} = res;
        if (code == 200) {
            const systemDataClone_ = [...systemData]
            let {addPeopleNum, interViewNum, onOnlineNum, userYearData, interViewYearData} = data
            systemDataClone_[0].num = addPeopleNum;
            systemDataClone_[1].num = interViewNum;
            systemDataClone_[2].num = onOnlineNum;
            setSystemData(systemDataClone_)
            setUserOption(prevUserOption => ({
                ...prevUserOption,
                series: [{...prevUserOption.series[0], data: userYearData}]
            }))
            setUserOption(prevUserOption => ({
                ...prevUserOption,
                series: [{...prevUserOption.series[0], data: userYearData}]
            }))
            setLineOption(prevUserOption => ({
                ...prevUserOption,
                series: [{...prevUserOption.series[0], data: interViewYearData}]
            }))
        }
    }

    useEffect(() => {
        getSyetemData()
    }, []);
    return (
        <div ref={homeRef} className="home">
            <Card>
                <div className="flx-align-center">
                    <Avatar size={64} src={reactImg}/>
                    <div className="ml10 fontW fontSize20">
                        <div>你好，</div>
                        <div>这里是首页</div>
                    </div>
                </div>
            </Card>

            <Row gutter={16} className="mt10">
                {
                    systemData.map((item, index) => (
                        <Col span={8} key={index}>
                            <Card title={item.label} bordered={false}
                                  extra={<i className={`iconfont ${item.icon} fontSize18`}
                                            style={{color: item.color}}/>}>
                                <div className="flx-justify-between">
                                    <div className="fontSize16">
                                        {item.text}
                                    </div>
                                    <div className="fontSize22 fontW" style={{color: item.color}}>
                                        {item.num}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

            <Card className="mt10">
                <div className="chart">
                    <EChart option={userOption}/>
                </div>
            </Card>

            <Card className="mt10">
                <div className="chart">
                    <EChart option={lineOption}/>
                </div>
            </Card>
        </div>
    )
}

export default home;
