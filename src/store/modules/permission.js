import { constantRouterMap } from '@/router'

const permission = {
  state: {
    routes: constantRouterMap,
    menuList: []
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.menuList = routes
      state.routes = constantRouterMap.concat(routes)
    }
  },
  actions: {
    SetRoutes({ commit }, routes) {
      commit('SET_ROUTES', routes.concat({
        path: '*', redirect: '/404', hidden: true
      }))
    }
  }
}

export default permission
