import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'

const app = createApp(App)
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

app.use(router)

app.mount('#app')
