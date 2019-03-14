export default {
  /**
   * 渠道管理
   */
  // 数据查询
  pageDitch: 'get,ditch/pageDitch',
  // 负责人
  selectDitchCharge: 'get,ditch/selectDitchCharge',
  // 渠道等级下拉列表
  selectDitchCommission: 'get,ditch/selectDitchCommission',
  // 根据渠道等级 获取对应佣金百分比
  selectCommissionPercentById: 'get,ditch/selectCommissionPercentById',
  // 新增数据保存
  saveDitch: 'post,ditch/saveDitch',
  // 修改数据保存
  updateDitch: 'post,ditch/updateDitch',
  // 删除
  delDitch: 'get,ditch/delDitch',
  // 重新分配
  reallocate: 'post,ditch/reallocate',
  // 跟进
  followUp: 'post,ditch/saveDitchFollowSituation',
  // 跟进详情
  followUpDetail: 'get,ditch/pageDitchFollowSituation',
  /**
   * 名单管理
   */
  // 数据查询
  pageListManage: 'get,listManage/pageListManage',
  // 新增保存
  saveListManage: 'post,listManage/saveListManag',
  //  =====佣金板块=====
  // 编辑佣金
  saveDitchCommission: 'post,ditchCommission/save',
  // 佣金列表
  listDitchCommission: 'get,ditchCommission/list',
  // 佣金等级验证
  validDitchCommission: 'get,ditchCommission/valid',

  // 黑名单管理
  blackList:'get,blacklist/pageBlacklist'
}
