import {useRoutes} from "react-router";
import Layout from "../layout";

export const rootRouter = [
    {
        path:'/',
        element: <Layout/>
    }
]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}

export default Router

