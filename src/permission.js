import router, { tranRoutes } from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { getToken, TokenKey } from '@/utils/auth' // 验权

// const whiteList = [] // 不重定向白名单
const { getters, dispatch } = store
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // const token = getToken()
  // 本地存在token
  // if (token && token !== 'undefined') {
  if (getters.menuList.length === 0) {
    try {
      // 拉取用户信息
      const menuList = await dispatch('GetInfo')
      // 设置路由
      await dispatch('SetRoutes', tranRoutes(menuList))
      // 动态添加可访问路由表
      router.addRoutes(getters.menuList)
      // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      next({ ...to, replace: true })
    } catch (e) {
      e !== 1001 && await dispatch('LogOut')
    }
  } else {
    next()
  }
  // } else {
  //   const { query, path } = to
  //   if (whiteList.indexOf(path) !== -1) {
  //     next()
  //   } else { // 否则全部重定向到登录页
  //     const { [TokenKey]: token } = query
  //     if (token) {
  //       await dispatch('SetInfo', query)
  //       next({ ...to, query: {}})
  //     } else {
  //       await dispatch('LogOut')
  //     }
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
