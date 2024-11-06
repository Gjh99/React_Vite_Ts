import {Avatar, Card, Col, Row} from "antd";
import React, {useRef, useState} from "react";
import reactImg from '@/assets/react.svg';
import EChart from "../../component/Echart.tsx";
import './index.less';

const dataList = [
    {
        label: '用户人数',
        icon: 'icon-tuandui',
        text: '上月新增用户数',
        color: '#4c4cf5'
    },
    {
        label: '访问量',
        icon: 'icon-yonghufangwenliang',
        text: '上月累计访问量',
        color: '#f12020'
    },
    {
        label: '在线人数',
        icon: 'icon-zaixianrenshu',
        text: '上月累计在线人数',
        color: '#4c4cf5'
    },
]

function home() {
    const homeRef = useRef(null);
    const [option] = useState({
        xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {},
        series: [{
            name: '用户数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 5, 20, 5, 20]
        }]
    });
    const [lineOption] = useState({
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
            data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 230, 210, 101],
            areaStyle: {}
        }]
    });
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
                    dataList.map((item, index) => (
                        <Col span={8} key={index}>
                            <Card title={item.label} bordered={false}
                                  extra={<i className={`iconfont ${item.icon} fontSize18`}
                                            style={{color: item.color}}/>}>
                                <div className="fontSize16">
                                    {item.text}
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

            <Card className="mt10">
                <div className="chart">
                    <EChart option={option}/>
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
