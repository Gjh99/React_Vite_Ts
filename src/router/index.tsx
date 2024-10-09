import {Navigate, useRoutes} from "react-router";
import Layout from "../layout";
import Login from '@/views/login'
import Home from '@/views/home'

export const rootRouter = [
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/login',
        element: <Login/>,
        meta:{
            title: '登录',
            key: 'login',
            requiresAuth: false
        }
    },
    {
        element: <Layout/>,
        children:[
            {
                path: '/home',
                element: <Home/>,
                meta:{
                    title: '首页',
                    key: 'home',
                    requiresAuth: true
                }
            }
        ]
    }

]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}

export default Router

