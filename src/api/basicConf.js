export default {
  /**
   * 基础配置
   */
  // 用户列表
  userList: 'get,userList',
  // 查询指定业务的组织列表
  orgList: 'get,orgList',
  // 销售人员信息维护
  sellerSave: 'post,emp/seller/save',
  // 销售人员列表
  sellerList: 'get,emp/seller/list',
  // 教师可授科目查询
  teacherClsType: 'get,emp/teacher/classType',
  // 教师授课科目配置
  teacherClsSet: 'get,emp/teacher/allocate',
  // 教师列表
  teacherList: 'get,emp/teacher/list',
  /**
   * 价格相关
   */
  // 价格体系列表
  sysList: 'get,sysgrade/list',
  // 价格体系维护
  sysSave: 'post,sysgrade/save',
  // 价格体系唯一性校验
  sysValid: 'get,sysgrade/valid',
  selectDitchCharge: 'get,ditch/selectDitchCharge',

  /*
  * 课程管理
  * */
  //  科目下拉列表
  classType: 'get,classType/index',
  // 课程列表
  courseList: 'get,course/list',
  // 课程维护
  courseSave: 'post,course/save',
  // 课程唯一性校验
  courseValid: 'get,course/valid',
  /*
  * 学科配置
  * */
  // 学科配置列表
  clsTypeList: 'get,classType/list',
  // 学科配置维护
  clsTypeSave: 'post,classType/save',
  // 学科配置唯一性校验
  clsTypeValid: 'get,classType/valid',
  /*
  * 渠道佣金比例
  * */
  // 渠道佣金比例列表
  ditchComList: 'get,ditchCommission/list',
  // 渠道佣金比例维护
  ditchComSave: 'post,ditchCommission/save',
  // 渠道佣金比例唯一性校验
  ditchComValid: 'get,ditchCommission/valid',
  /*
  * 分配比例配置
  * */
  // 回抽期限配置列表
  withDrawList: 'get,withdrawConf/list',
  // 回抽期限配置维护
  withDrawSave: 'post,withdrawConf/save',
  // 销售等级名单配置列表
  sellLevList: 'get,sellerLevelConf/list',
  // 销售分配比例维护
  sellLevSave: 'post,sellerLevelConf/save',
  // 销售人员名单类型数量统计
  sellerListCnt: 'get,sellerLevelConf/sellerListCnt'
}
