const getters = {
  ctrl: state => (module, key) => {
    const { [module]: moduleStore } = state
    return typeof moduleStore === 'object' ? undefined : moduleStore[key]
  },
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  loading: state => state.app.loading,
  singleLoading: state => key => state.app.loading[key],
  visitedViews: state => state.tagsView.visitedViews,
  token: state => state.user.token,
  busiCodes: state => state.user.busiCodes,
  manageUserIds: state => state.user.manageUserIds,
  userName: state => state.user.userName,
  routes: state => state.permission.routes,
  menuList: state => state.permission.menuList,
  baseSetting: state => state.tableConfig.baseSetting,
  isShowInput:state => state.isShowInput.hideInputValue
}
export default getters
