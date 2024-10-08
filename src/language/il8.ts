import i18n from 'i18next';
import translationEn from './locales/en.ts';
import translationZh from './locales/zh.ts';
import {initReactI18next} from "react-i18next";

const resources = {
    en:{
        translation: translationEn
    },
    zh:{
        translation: translationZh
    }
}
console.log('resources', resources)

i18n.use(initReactI18next).init({
    resources,
    lng: 'zh', //默认语言
    // keySeparator: false, // 默认情况下，`ns`为`translation`，`key`为`home.title`，将会变成`translation.home.title`
    interpolation: {
        escapeValue: false, // 不要对值进行转义
    }
})

export default i18n;
