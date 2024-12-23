import {DictDataInterFace} from "@/interfaces/common";

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
 * @param {Boolean} isReturnParentTitle 是否返回父级名字
 * @return array
 */
export const searchRoute = (path: string, routes: any, isReturnParentTitle: boolean | null = null) => {
    let result = {};
    for (let item of routes) {
        if (item.path === path) return item;
        if (item.children) {
            const res = searchRoute(path, item.children, isReturnParentTitle);
            if (isReturnParentTitle && item.meta && Object.keys(res).length) {
                res.title = item.meta.title;
            }
            if (Object.keys(res).length) result = res;
        }
    }
    return result;
};
/**
 * @description arrayBuffer转base64
 * @param {ArrayBuffer}  buffer
 * @return base64
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const uint8Array = new Uint8Array(buffer);
    let binaryString = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binaryString);
}

/**
 * @description 字典转换
 * @param {dictData}  array
 * @param {id}  number
 * @return label
 */
export const transformDictData = (dictData: DictDataInterFace[], id: number) => {
    const item: DictDataInterFace | undefined = dictData.find(item => item.value == id)
    return item?.label
}

/**
 * @description 数组扁平化
 * @param {treeData}  array
 * @return array
 */
export const flattenTree = (treeData: any[]): any[] => {
    return treeData.flatMap(item => {
        const { children, ...rest } = item;
        return children && children.length > 0
            ? [rest, ...flattenTree(children)]
            : [rest];
    });
};
