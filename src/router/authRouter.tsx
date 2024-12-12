/*
* 路由守卫
* */
import {Navigate, useLocation} from "react-router";
import { rootRouter } from "@/router/index";
import {searchRoute} from "../utils";
import {getToken} from "@/utils/cookie";
const AuthRouter = (props: { children:any }) =>{
    const { pathname } = useLocation();
    const route = searchRoute(pathname, rootRouter);

    if (!route.meta?.requiresAuth) return props.children;

    const token = getToken()
    console.log('token', token)

    if (!token) {
        return <Navigate to="/login" replace />
    }
    return props.children;
}

export default AuthRouter;
