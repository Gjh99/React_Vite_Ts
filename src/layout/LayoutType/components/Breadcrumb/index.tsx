import {Breadcrumb} from "antd";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {searchRoute} from "@/utils";
import {rootRouter} from "@/router";

interface BreadcrumbItem {
    title: string;
    path?: string;
}

const MyBreadcrumb:React.FC = () => {
    const {pathname} = useLocation()
    const route = searchRoute(pathname, rootRouter, true)
    const [breadItem, setBreadItem] = useState<BreadcrumbItem[]>([]);

    const setRouteBread = () => {
        const homeBread:BreadcrumbItem[] = [{title: '首页', path:'/home' }]
        if (route.path !== '/home') {
            let itemTitle:BreadcrumbItem = {title: route.title}
            let metaTitle:BreadcrumbItem = {title: route.meta.title ?? ''}

            setBreadItem([...homeBread, itemTitle, metaTitle])
        } else {
            setBreadItem([...homeBread])
        }
    }
    useEffect(() => {
        setRouteBread()
    }, [route])

    return(
        <Breadcrumb
            className="ml10"
            items={[...breadItem]}
            separator=">"
        />
    )
}

export default MyBreadcrumb
