import {Breadcrumb} from "antd";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {searchRoute} from "../../../../utils";
import {rootRouter} from "@/router";

const MyBreadcrumb = () => {
    const {pathname} = useLocation()
    const route = searchRoute(pathname, rootRouter, true)
    const [breadItem, setBreadItem] = useState([]);

    const setRouteBread = () => {
        const homeBread = [{title: '首页', path:'/home' }]
        if (route.path !== '/home') {
            let itemTitle = {title: route.title}
            let metaTitle = {title: null}
            if (route.meta.title) {
                metaTitle = {title: route.meta.title}
            }
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
            items={[...breadItem]}
            separator=">"
        />
    )
}

export default MyBreadcrumb
