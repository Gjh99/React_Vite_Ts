import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from "prop-types";

const EChart = ({ option }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);
            chartInstance.setOption(option);

            window.addEventListener('resize', () => {
                chartInstance.resize();
            });

            return () => {
                chartInstance.dispose();
            };
        }
    }, [option]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;
};

EChart.propTypes = {
    option: PropTypes.object.isRequired,
};
export default EChart;
