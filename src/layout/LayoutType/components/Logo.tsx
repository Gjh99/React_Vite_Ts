import '../DefaultLayout/index.less'
import logoImg from "@/assets/image/logo.png"
function Logo() {
    return (
        <>
            <div className="logo">
                <div className="content">
                    <img src={logoImg}/>
                </div>
            </div>
        </>
    )
}

export default Logo
