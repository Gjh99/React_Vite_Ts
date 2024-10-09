/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
    const language = navigator.language
    let defaultLang = "";
    if (language === "CN" || language === "zh" || language === "zh-CN") {
        defaultLang = "zh";
    } else {
        defaultLang = "en";
    }
    return defaultLang;
};

/**
 * @description 查询当前对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @return array
 */
export const searchRoute = (path: string, routes) => {
    let result = {};
    for (let item of routes) {
        if (item.path === path) return item;
        if (item.children) {
            const res = searchRoute(path, item.children);
            if (Object.keys(res).length) result = res;
        }
    }
    return result;
};
