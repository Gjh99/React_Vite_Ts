import {setLayout} from "../redux/modules/global/action";
import './index.less'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

const DefaultLayout = React.lazy(() => import('./LayoutType/DefaultLayout'))
const SlideLayout = React.lazy(() => import('./LayoutType/SlideLayout'))
const TopLayout = React.lazy(() => import('./LayoutType/TopLayout'))

function MyLayout(props: any) {
    let {type, showTabs, showBreadcrumb} = props
    const [PageComponent, setPageComponent] = useState<React.ComponentType<any> | null>(null);
    useEffect(() => {
        setPageComponent(DefaultLayout)
    }, [])

    useEffect(() => {
        console.log('layoutState', type)
        switch (type) {
            case 'DefaultLayout':
                setPageComponent(DefaultLayout);
                break;
            case 'SlideLayout':
                setPageComponent(SlideLayout);
                break;
            case 'TopLayout':
                setPageComponent(TopLayout);
                break;
        }
    }, [type])

    return (
        <>
            {PageComponent && <PageComponent showTabs={showTabs} showBreadcrumb={showBreadcrumb}/>}
        </>
    )
}

const mapStateToProps = (state:any) => state.global

const mapDispatchToProps = {setLayout}

export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)
