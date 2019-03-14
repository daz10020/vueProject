<template>
  <div class="app-container">
    <div class="filter-container">
      <search-table-pagination
        ref="searchTable"
        :form-options="mainTableOption.formOptions"
        :columns="mainTableOption.columns"
        :data-handler="handleTableData"
        url="channel_pageListManage">
        <!-- table 自定义列追加 -->
        <template slot="append">
          <el-table-column label="详情" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
              >查看</el-button>
            </template>
          </el-table-column>
        </template>
        <template slot="">
          <h3 class="title before-button">名单信息</h3>
          <el-row>
            <el-button
              v-bind="baseSetting.button"
              type="success"
              plain
              icon="el-icon-circle-plus"
              @click="handleData()"
            >新增</el-button>
            <el-button
              v-bind="baseSetting.button"
              type="success"
              plain
              icon="el-icon-circle-plus"
              @click="handleData('edit')"
            >编辑</el-button>
            <el-button
              v-bind="baseSetting.button"
              type="danger"
              plain
              icon="el-icon-delete"
            >删除</el-button>
            <el-button
              v-bind="baseSetting.button"
              type="primary"
              plain
              icon="el-icon-upload2"
            >批量导入</el-button>
            <el-button
              v-bind="baseSetting.button"
              type="primary"
              plain
              icon="el-icon-document"
            >下载模版</el-button>
          </el-row>
        </template>
        <template slot="bottom">
          <h3 class="title">销售历史信息</h3>
          <el-table
            :data="hisTableData"
            border
          >
            <el-table-column
              v-for="(hisColumn,index) in hisColumns"
              :key="index"
              v-bind="hisColumn"
              align="center"
            />
          </el-table>
        </template>
      </search-table-pagination>
      <!-- 新增、修改弹框 -->
      <el-dialog
        :visible.sync="diaOptions.visible"
        :title="diaOptions.title[diaOptions.status]"
        v-bind="baseSetting.dialog"
        width="40%" >
        <base-form
          v-loading="getLoading.saveListManage"
          ref="diaform"
          :forms="diaOptions.forms"
          :current-value="diaOptions.currentValue" />
        <span slot="footer">
          <el-button v-bind="baseSetting.button" @click="diaOptions.visible = false">取 消</el-button>
          <el-button
            :loading="getLoading.saveListManage"
            v-bind="baseSetting.button"
            type="primary"
            @click="saveData">
            确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SearchTablePagination from '@/components/SearchTablePagination'
import BaseForm from '@/components/BaseForm'
import { validatePhone } from '@/utils/validate'
import { reqInit } from '@/utils/request'
import { parseTime } from '@/utils/date'
const request = reqInit('channel')
/**
 * SearchTablePagination 组件传递参数
 * formOptions 检索相关参数
 * columns 表格列信息
 *  */
// 字典下拉数据处理
const dictSelectHandle = item => {
  return {
    label: item.dictitemDesc, value: item.dictitemCode
  }
}
// 渠道来源
const sourceSelectHandle = item => {
  return {
    label: item.name, value: item.id
  }
}

// 上传人 下拉数据处理
const uploaderSelectHandle = item => {
  return {
    label: item.realName, value: item.userId
  }
}

const mainTableOption = {
  formOptions: {
    forms: [
      { prop: 'listName', label: '姓名' },
      { prop: 'listPhone', label: '手机号' },
      { prop: 'listWechart', label: '微信号' },
      { prop: 'createTime', label: '创建日期', itemType: 'daterange', defaultVaule: [new Date(), new Date()], parseRule: 'YYYY-MM-DD' },
      { prop: 'isIntention', label: '意向客户', itemType: 'select', options: [{ label: '无意向', value: 0 }, { label: '有意向', value: 1 }] },
      { prop: 'listType', label: '名单类型', itemType: 'select', options: [], remoteUrl: 'dictionary_dictItem', selectParams: { dictCode: 'list_type' }, resultHandler: dictSelectHandle, filterable: true },
      { prop: 'listLevel', label: '名单等级', itemType: 'select', options: [], remoteUrl: 'dictionary_dictItem', selectParams: { dictCode: 'list_level' }, resultHandler: dictSelectHandle, filterable: true },
      { prop: 'saleStatus', label: '状态', itemType: 'select', options: [], remoteUrl: 'dictionary_dictItem', selectParams: { dictCode: 'sale_status' }, resultHandler: dictSelectHandle, filterable: true },
      { prop: 'isReferr', label: '是否转介绍', itemType: 'select', options: [], remoteUrl: 'dictionary_dictItem', selectParams: { dictCode: 'yes_no' }, resultHandler: dictSelectHandle, filterable: true },
      { prop: 'ditchId', label: '来源渠道', itemType: 'select', options: [], selectParams: { pageSize: 10, pageNo: 1 }, remoteUrl: 'channel_pageDitch', resultHandler: sourceSelectHandle, filterable: true },
      { prop: 'uploaderId', label: '上传人', itemType: 'select', options: [], selectParams: { pageSize: 10, pageNo: 1, roleConfKey: 'list.uploader.role.codes' }, remoteUrl: 'user_roles', resultHandler: uploaderSelectHandle, filterable: true },
      { prop: 'headId', label: '跟进人', itemType: 'select', options: [], selectParams: { pageSize: 10, pageNo: 1, roleConfKey: 'list.header.role.codes' }, remoteUrl: 'user_roles', resultHandler: uploaderSelectHandle, filterable: true }
    ]
  },
  columns: [
    { type: 'selection', width: 40 },
    { prop: 'listName', label: '姓名', width: 150 },
    { prop: 'sex', label: '性别', width: 80 },
    { prop: 'listPhone', label: '手机号', width: 150 },
    { prop: 'parentName', label: '家长姓名', width: 150 },
    { prop: 'parentPhone', label: '家长手机号', width: 150 },
    { prop: 'ditchName', label: '渠道', width: 150 },
    { prop: 'uploaderName', label: '上传人', width: 150 },
    { prop: 'tracker', label: '跟进人', width: 150 },
    { prop: 'instrest', label: '意向课程', width: 180 },
    { prop: 'creatTime', label: '创建时间', width: 180 },
    { prop: 'record', label: '最新销售记录', width: 180 },
    { prop: 'remarks', label: '备注', width: 180 },
    { prop: 'status', label: '状态', width: 180 },
    { prop: 'type', label: '名单类型', width: 120 },
    { prop: 'level', label: '名单等级', width: 120 },
    { prop: 'activity', label: '活动' }
  ]
}

const hisColumns = [
  { type: 'index', wwidth: 50 },
  { prop: 'tracker', label: '跟进人', width: 100 },
  { prop: 'answerPhone', label: '是否接听', width: 100 },
  { prop: 'time', label: '跟进时间', width: 180 },
  { prop: 'tel', label: '接触电话', width: 150 },
  { prop: 'status', label: '销售状态' },
  { prop: 'remark', label: '备注' }
]

/**
 * 弹窗参数
 */

const diaOptions = {
  visible: false,
  status: 0,
  title: ['新增', '编辑'],
  forms: [
    { prop: 'singleradio', label: '单选', itemWidth: 100, itemType: 'radio', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }], defaultValue: 0 },
    { prop: 'listName', label: '姓名', itemWidth: 100, rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }] },
    { prop: 'sex', label: '性别', itemType: 'select', options: [{ label: '女', value: 0 }, { label: '男', value: 1 }, { label: '未知', value: 2 }] },
    { prop: 'listPhone', label: '电话', rules: [{ message: '请输入正确的手机号', trigger: 'blur', validator: validatePhone }] },
    { prop: 'listWechart', label: '微信' },
    { prop: 'school', label: '学校' },
    { prop: 'gradeName', label: '年级' },
    { prop: 'parentJsonStr', label: '家长信息' },
    { prop: 'listLevel', label: '名单等级', itemType: 'select', options: [{ label: 'S', value: 0 }] },
    // { prop: 'uploaderId', label: '上传人', itemType: 'select', remoteUrl: 'channel_uploader', resultHandler: uploaderSelectHandle, filterable: true },
    { prop: 'intention', label: '意向课程' },
    { prop: 'listRemark', label: '备注', itemType: 'textarea' }

  ],
  currentValue: {}
}

export default{
  name: 'ListManage',
  components: { SearchTablePagination, BaseForm },
  data() {
    return {
      mainTableOption,
      hisColumns,
      hisTableData: [
        { tracker: 'aa', answerPhone: '是', time: '2018-12-12 12:12:12', tel: '13016146363', status: '其他', remark: '无' }
      ],
      diaOptions,
      selections: []
    }
  },
  computed: {
    getLoading() {
      return this.$store.getters.loading
    },
    baseSetting() {
      return this.$store.getters.baseSetting
    }
  },
  watch: {
    '$route'(to, from) {
      const { params } = to
      if (params) {
        // 查询数据
        Object.keys(to.params).forEach((key) => {
          console.log(key, params[key])
        })
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 表格数据处理
    handleTableData(item, index) {
      return item
    },
    // 新增、编辑表格数据弹窗
    handleData(type) {
      // 重置
      const currentValue = {}
      let status = 0
      if (type === 'edit') {
        // 编辑
        status = 1
      }
      this.diaOptions = Object.assign(this.diaOptions, { visible: true, status, currentValue, validateObj: { dictCode: { dictId: row.id }}})
      // 清空表单
      this.$nextTick(() => {
        this.$refs.diaform.reset()
      })
    },
    // 保存
    saveData() {
      const path = ['saveListManage', 'updateDitch']
      this.$refs.diaform.getParams((error, formParams) => {
        if (!error) {
          const params = {
            ...formParams
          }
          if (this.diaOptions.status === 1) {
            // 编辑旧数据
            params.id = this.diaOptions.currentValue.id
          }
          request(path[this.diaOptions.status], params, { loadKey: 'saveListManage' }).then(res => {
            // 关闭弹窗
            this.diaOptions.visible = false
            // 更新table数据
            this.$refs.searchTable.fetchHandler()
          })
        }
      })
    }
  }

}

</script>
<style lang='scss' scoped>
.title{
  font-size:16px;
  margin-top:7px;
}
.before-button{
  margin-bottom:10px;
}
</style>
