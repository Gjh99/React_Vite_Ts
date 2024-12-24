import logoImg from "@/assets/image/logo.png"
import logoCollapsed from "@/assets/image/logoCollapsed.png"

const Logo = (prop: any) => {
    return (
        <>
            <div className={prop.collapsed ? 'logoCollapsed' : "logo"}>
                <div className={prop.collapsed ? '' : "content"}>
                    <img className={prop.collapsed ? 'logoCollapsedImg' : ''}
                         src={prop.collapsed ? logoCollapsed : logoImg}/>
                </div>
            </div>
        </>
    )
}

export default Logo
