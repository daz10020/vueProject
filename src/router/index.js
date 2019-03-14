import Vue from 'vue'
import Router from 'vue-router'
// 路由单例
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** 配置说明
 * hidden: true                   条目始终不在导航栏显示
 * alwaysShow: true               始终显示在导航栏，即使children为0
 * redirect: noredirect           面包屑项跳转路由
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               导航栏及面包屑名称
    icon: 'svg-name'             图标选择
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
let modulesRoutes = [
  {
    path: '/',
    url: 'views/layout/Layout',
    title: '首页',
    icon: 'home'
  }]

// 读取所有js文件 本地路由
const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach(fileName => {
  modulesRoutes = modulesRoutes.concat(requireModule(fileName).default)
})

const mergeRoute = ({ url, id, parentId, icon, name }) => {
  const pageOpt = modulesRoutes.filter(page => page.url === url)[0]
  const route = {
    parentId,
    name: id
  }
  if (pageOpt) {
    const { icon: picon, breadcrumb, title } = pageOpt
    Object.assign(route, {
      ...pageOpt,
      component: () => import(`@/${url}`),
      meta: {
        breadcrumb,
        title: name || title,
        icon: icon || picon
      }
    })
  } else {
    Object.assign(route, {
      path: id + '',
      redirect: '/404',
      meta: {
        title: name,
        icon
      }
    })
  }
  return route
}
/*
* 根据权限转化菜单
* @TypeOf Array
* */
export const tranRoutes = menu => {
  const menuList = menu.map(mergeRoute)
  return menuList.filter(parent => {
    const { path, name, parentId, redirect } = parent  
    const children = menuList.filter(child => name === child.parentId)
    children.length && Object.assign(parent, {
      children,
      redirect: redirect || `${path.replace(/\/$/, '')}/${children[0].path}`
    })
    return !parentId
  })
}

export const constantRouterMap = [
  // { path: '*', redirect: '/404', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // base: '/boluo-dict-web/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
