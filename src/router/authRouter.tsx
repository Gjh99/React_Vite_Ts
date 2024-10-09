/*
* 路由守卫
* */
import {store} from "@/redux/index"
import {Navigate, useLocation} from "react-router";
import { rootRouter } from "@/router/index";
import {searchRoute} from "../utils";
const AuthRouter = (props: { children }) =>{
    console.log('路由守卫', props.children)
    const { pathname } = useLocation();
    const route = searchRoute(pathname, rootRouter);

    console.log('route', route)

    if (!route.meta?.requiresAuth) return props.children;

    console.log('store', store)

    const token = store.getState().auth?.token
    console.log('token', token)

    if (!token) {
        console.log('没有tk')
        return <Navigate to="/login" replace />
    }
}

export default AuthRouter;
