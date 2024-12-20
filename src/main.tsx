import {createRoot} from 'react-dom/client'
import MyApp from './App'
import '@/styles/reset.less'
import '@/styles/common.less'
import '@/styles/theme.less'
import '@/language/il8.ts'
import {Provider} from 'react-redux'
import {persistor, store} from "./redux/index";
import {PersistGate} from "redux-persist/integration/react";
import '@/assets/iconfont/iconfont.css'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <MyApp/>
        </PersistGate>
    </Provider>
    // </StrictMode>
// ,
)
