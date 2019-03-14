/*
* 路由渲染
* 目前仅支持到二级路由
* */
/* Layout */
import Layout from '@/views/layout/Layout'

export const bundle = (route, isChild) => {
  const { name, title, icon, url, breadcrumb } = route
  return {
    path: `${isChild ? '' : '/'}${name ? name.toLocaleLowerCase() : ''}`,
    name,
    meta: { title, icon, breadcrumb },
    component: isChild ? url ? () => import(`@/${url}`) : null : Layout,
    ...route
  }
}

export const bundleRouters = routers => {
  return routers.map(item => {
    const { children } = item
    const iR = bundle(item)
    return {
      ...iR,
      redirect: children && children.length ? `${children.length === 1 ? '' : iR.path}/${children[0].name.toLocaleLowerCase()}` : undefined,
      children: children.map(child => ({
        ...bundle(child, true),
        ...child
      }))
    }
  })
}
