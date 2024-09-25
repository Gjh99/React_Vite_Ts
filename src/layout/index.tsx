import {setLayout} from "../redux/modules/global/action";
import './index.less'
import React, {Suspense, useEffect, useState} from "react";
import {connect} from "react-redux";

const DefaultLayout = React.lazy(() => import('./LayoutType/DefaultLayout'))
const SlideLayout = React.lazy(() => import('./LayoutType/SlideLayout'))
const TopLayout = React.lazy(() => import('./LayoutType/TopLayout'))

function MyLayout(props:any) {
    let { type } = props
    const [PageComponent, setPageComponent] = useState(null);
    useEffect(()=>{
        setPageComponent(DefaultLayout)
    },[])

    useEffect(() => {
        console.log('layoutState',type)
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
           <Suspense fallback={<div>Loading...</div>}>
                {PageComponent && <PageComponent/>}
            </Suspense>
        </>
    )
}

const mapStateToProps = (state) => state.global

const mapDispatchToProps = {setLayout}

export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)
