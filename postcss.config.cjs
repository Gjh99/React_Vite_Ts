module.exports = {
    plugins: [
        require('postcss-px-to-viewport')({
            viewportWidth: 1920, // 设计稿宽度
            viewportHeight: 1060, // 设计稿高度
            unitPrecision: 5, // 小数点精度
            viewportUnit: 'vw', // 目标单位
            selectorBlackList: ['ignore', 'tab-bar', 'nav-bar'], // 忽略的类
            minPixelValue: 1, // 小于或等于1px不转换
            mediaQuery: false, // 允许在媒体查询中转换px
        }),
    ],
};
