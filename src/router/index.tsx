import {Navigate, useRoutes} from "react-router";
import Layout from "../layout";
import Home from '@/views/home'

export const rootRouter = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true, // 当路径为 `/` 时，重定向到 `/home`
                element: <Navigate to="/home"/>,
            },
            {
                path: 'home',
                element: <Home/>,
                title: '首页',
                key: 'home'
            }
        ]
    },

]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}

export default Router

