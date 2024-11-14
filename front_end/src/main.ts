import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './themes/global.less'
import './themes/override.less'
import 'vant/lib/index.css'

Object.defineProperties(window, {
    '_AMapSecurityConfig':{
        value:{
            'securityJsCode': "64f0f85e638dbc51ad583da024638faa"
        },
        writable: false,
        enumerable: true,
        configurable: true
    }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
