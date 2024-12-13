import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root', // 可选，用于在localStorage中设置键名
    storage, // 存储引擎，默认使用localStorage
    blacklist: ['tabs']
    // 其他配置选项...
};

export default persistConfig
