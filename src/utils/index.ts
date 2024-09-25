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
