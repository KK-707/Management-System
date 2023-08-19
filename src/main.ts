import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
// 导入svg
import 'virtual:svg-icons-register'
// 导入自定义插件
import gloablComponent from './components/index'
// 引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//配置国际化
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
//引入仓库
import pinia from './store'
//引入路由鉴权文件
import './permission'
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
//安装自定义插件
app.use(gloablComponent)
//注册模板路由
app.use(router)
//安装仓库
app.use(pinia)
//引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)

app.mount('#app')
