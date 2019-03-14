export default {
    // 销售模块
    // 销售首页
    // 电话呼出
    callPhone: 'post,callRecord/callOut',
    // 新增家长信息
    addParentInfo: 'post,customerSum/addListParent',
    // 修改家长信息保存
    saveReviseParentInfo: 'post,customerSum/updateListParent',
    // 获取下一客户信息接口
    getNextCustomer: 'get,customerSum/getNextListInfo',
    // 获取家长信息
    getPraentInfo: 'get,customerSum/getListParent',
    // 保存修改学生信息
    saveReviseStudentInfo:'post,customerSum/updateList',
    // 查询名单通话记录信息
    queryListCallLog: 'get,callRecord/getCallRecByListId',
    // 预约名单列表
    orderList:'get,customerSum/getAppointList',
    // 销售历史信息查询
    getSalesHistoryInfo:'get,saleRecord/list',
    // 名单查询
    listSearch:'get,customerSum/searchList'
}