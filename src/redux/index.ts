import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import persistConfig from "./persistConfig.ts"; // 默认使用localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from "redux-thunk";
import promise from 'redux-promise';
import global from "./modules/global/reducer.ts";

const middleWares = applyMiddleware(thunk, promise)

// 拆分reducer
const reducer= combineReducers({
    global
})

const persistedReducer =  persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(middleWares))

// 创建持久化store
const persistor = persistStore(store);

export { store, persistor };
