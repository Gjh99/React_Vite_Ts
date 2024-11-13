import {Navigate, useRoutes} from "react-router";
import Layout from "../layout";
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/system/user'
import Role from '@/views/system/role'
import PictureConversion from '@/views/toolBox/PictureConversion'

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
                    key: 'home',
                    requiresAuth: true
                }
            }
        ],
        meta: {
            title: "首页"
        },
    },
    {
        element: <Layout/>,
        meta: {
            title: "系统设置"
        },
        children:[
            {
                path: '/system/user',
                element: <User/>,
                meta:{
                    title: '用户管理',
                    key: 'user',
                    requiresAuth: true
                }
            },
            {
                path: '/system/role',
                element: <Role/>,
                meta:{
                    title: '角色管理',
                    key: 'role',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        element: <Layout/>,
        meta: {
            title: "工具箱"
        },
        children:[
            {
                path: '/Toolbox/PictureConversion',
                element: <PictureConversion />,
                meta:{
                    title: '图片转换',
                    key: 'PictureConversion',
                    requiresAuth: true
                }
            },
            {
                path: '/system/role',
                element: <Role/>,
                meta:{
                    title: '角色管理',
                    key: 'role',
                    requiresAuth: true
                }
            },
        ]
    },

]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}

export default Router

