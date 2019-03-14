// import { TokenKey, getToken, setToken, removeToken } from '@/utils/auth'
import { reqInit } from '@/utils/request'

const request = reqInit('user')
const user = {
  state: {
    // token: getToken(),
    userId: '',
    busiCodes: '',
    manageUserIds: [],
    userName: ''
  },

  mutations: {
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // },
    // SET_USERID: (state, userId) => {
    //   state.userId = userId
    // },
    SET_ROLES(state, roles) {
      const { busiCodes, manageUserIds, userName } = roles
      Object.assign(state, {
        busiCodes, manageUserIds, userName
      })
    }
  },

  actions: {
    // // 登陆
    // async SetInfo({ dispatch, commit }, loginInfo) {
    //   const { userId, [TokenKey]: token } = loginInfo
    //   setToken(token)
    //   commit('SET_USERID', userId)
    //   commit('SET_TOKEN', token)
    // },
    // 获取用户信息
    async GetInfo({ commit }) {
      const { data } = await request('getInfo')
      console.log(data)
      commit('SET_ROLES', data)
      const { sessionPermission: { menuList = [] } = { menuList: [] }} = data
      return menuList
    },

    // 登出
    async LogOut({ commit, dispatch }) {
      const { data: { loginUrl } = {}} = await request('logout')
      await dispatch('FedLogOut', loginUrl)
    },

    // 前端登出
    async FedLogOut({ commit }, loginUrl) {
      // commit('SET_TOKEN', '')
      // removeToken()
      // 重新实例化vue-router对象 避免bug
      window.location.replace(loginUrl)
    }
  }
}

export default user
