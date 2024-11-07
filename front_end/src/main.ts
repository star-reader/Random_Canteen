import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import './themes/global.less'
import './themes/override.less'

const app = createApp(App)

app.use(router)
app.mount('#app')
