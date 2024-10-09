import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import '@/styles/reset.less'
import '@/styles/common.less'
import '@/styles/theme.less'
import '@/language/il8.ts'
import {Provider} from 'react-redux'
import {persistor, store} from "./redux/index.ts";
import {PersistGate} from "redux-persist/integration/react";
import '@/assets/iconfont/iconfont.css'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
    // </StrictMode>
// ,
)
