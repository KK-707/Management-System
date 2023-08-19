// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// // 引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
import { UserState } from './type/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）、异步路由、任意路由
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
//导入路由器对象
import routers from '@/router'
//引入深拷贝方法
//@ts-expect-error 忽略ts检验
import cloneDeep from 'lodash/cloneDeep'
//定义方法用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      //   token: localStorage.getItem('TOKEN'), // 用户唯一标识token，保证刷新不丢失
      token: GET_TOKEN(), // 用户唯一标识token
      menuRoutes: constantRoute, // 仓库存储生成菜单生成数组
      username: '',
      avatar: '',
      buttons: [], //存储当前用户是否包含某一个按钮
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      // 登录成功状态200 token
      // 登录失败状态201 登录失败错误的信息
      if (result.code == 200) {
        // pinia存储一下token
        this.token = result.data as string
        // 本地存储持久化
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data as string)
        // 保证当前async返回成功结果
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 用户信息的获取
    async userInfo() {
      // 获取用户信息存储到仓库中（头像与名字）
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )
        // console.log(userAsyncRoute, '动态路由')
        // //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //打印目前拥有的路由
        // console.log(routers.getRoutes(), 'xx')
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          routers.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库方法
export default useUserStore
