import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import persistConfig from "./persistConfig"; // 默认使用localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from "redux-thunk";
import promise from 'redux-promise';
import global from "./modules/global/reducer";
import auth from "./modules/auth/reducer";
import tabs from "./modules/tabs/reducer";

const middleWares = applyMiddleware(thunk, promise)

// 拆分reducer
const reducer= combineReducers({
    global,
    auth,
    tabs
})

// @ts-ignore
const persistedReducer =  persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(middleWares))

// 创建持久化store
// @ts-ignore
const persistor = persistStore(store);

export { store, persistor };
