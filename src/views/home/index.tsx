
import { DatePicker } from 'antd';
import { useTranslation } from "react-i18next";
import { Button } from "antd";
function home() {
    const { t } = useTranslation();
    return(
        <>
        首页
            <DatePicker />
            <Button type="primary" htmlType="submit">
                {t("login.confirm")}
            </Button>
        </>
    )
}

export default home
