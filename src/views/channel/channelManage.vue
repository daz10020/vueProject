<template>
  <div class="app-container">
    <div class="filter-container">
      <search-table-pagination
        ref="searchTable"
        :columns="mainTableOption.columns"
        :form-options="mainTableOption.formOptions"
        :data-handler="handleTableData"
        url="channel_pageDitch"
        @selection-change="selectchange">
        <template slot="append">
          <el-table-column v-bind="baseSetting.column" label="跟进" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-bind="baseSetting.button"
                type="primary"
                @click="followUp(scope.row)">跟进</el-button>
            </template>
          </el-table-column>
          <el-table-column v-bind="baseSetting.column" label="跟进详情" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-bind="baseSetting.button"
                type="primary"
                @click="followUpDetail(scope.row)">跟进详情</el-button>
            </template>
          </el-table-column>
          <el-table-column v-bind="baseSetting.column" label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-bind="baseSetting.button"
                type="primary"
                @click="handleData(scope.row)">编辑</el-button>
              <el-button
                v-bind="baseSetting.button"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
        <template slot="">
          <el-row>
            <el-button
              v-bind="baseSetting.button"
              type="success"
              plain
              icon="el-icon-circle-plus"
              @click="handleData()">新增</el-button>
            <el-button
              v-bind="baseSetting.button"
              type="primary"
              plain
              icon="el-icon-refresh"
              @click="refreshData()"
            >重新分配</el-button>
          </el-row>
        </template>
      </search-table-pagination>
      <!-- 新增、修改弹框 -->
      <el-dialog
        :visible.sync="diaOptions.visible"
        :title="diaOptions.title[diaOptions.status]"
        v-bind="baseSetting.dialog"
        width="40%" >
        <base-form
          v-loading="getLoading.saveDitch"
          ref="diaform"
          :forms="diaOptions.forms"
          :current-value="diaOptions.currentValue" />
        <span slot="footer">
          <el-button v-bind="baseSetting.button" @click="diaOptions.visible = false">取 消</el-button>
          <el-button
            :loading="getLoading.saveDitch"
            v-bind="baseSetting.button"
            type="primary"
            @click="saveData">
            确 定</el-button>
        </span>
      </el-dialog>
      <!-- 重新分配 -->
      <el-dialog
        :visible.sync="refreshOptions.visible"
        v-bind="baseSetting.dialog"
        title="重新分配"
        width="40%" >
        <base-form
          v-loading="getLoading.reallocate"
          ref="refreshForm"
          :forms="refreshOptions.forms"
          :current-value="refreshOptions.currentValue" />
        <span slot="footer" class="dialog-footer">
          <el-button v-bind="baseSetting.button" @click="refreshOptions.visible = false">取 消</el-button>
          <el-button
            :loading="getLoading.reallocate"
            v-bind="baseSetting.button"
            type="primary"
            @click="saveRefresh">
            确 定</el-button>
        </span>
      </el-dialog>
      <!-- 跟进弹窗 -->
      <el-dialog
        :visible.sync="followUpOptions.visible"
        :title="followUpOptions.title"
        v-bind="baseSetting.dialog"
        width="40%"
        center>
        <base-form
          v-loading="getLoading.followUp"
          ref="followUpForm"
          :forms="followUpOptions.forms"
          :current-value="followUpOptions.currentValue" />
        <span slot="footer">
          <el-button v-bind="baseSetting.button" @click="followUpOptions.visible = false" >取 消</el-button>
          <el-button
            :loading="getLoading.followUp"
            v-bind="baseSetting.button"
            type="primary"
            @click="handleFollowUp()">
            确 定</el-button>
        </span>
      </el-dialog>
      <!-- 跟进详情弹窗 -->
      <el-dialog
        :visible.sync="followUpDetailOptions.visible"
        :title="followUpDetailOptions.title"
        v-bind="baseSetting.dialog"
        width="60%" >
        <search-table-pagination
          ref="followSearchTable"
          :page-sizes="[10,15,20]"
          :columns="followUpDetailOptions.column"
          :form-options="followUpDetailOptions.formOption"
          :params="followUpDetailOptions.params"
          :data-handler="handlefollowUpDetailData"
          url="channel_followUpDetail"/>
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
import { MessageBox } from 'element-ui'
const request = reqInit('channel')

/**
 * SearchTablePagination 组件传递参数
 * formOptions 检索相关参数
 * columns 表格列信息
 *  */
// 跟进人数据处理
const chSelectHandle = item => {
  return {
    label: item.employeeName, value: item.id
  }
}

const mainTableOption = {
  formOptions: {
  // 表单内容 prop值为接口对应的参数名
    forms: [
      { prop: 'name', label: '姓名' },
      { prop: 'ditchPhone', label: '电话' },
      { prop: 'wechart', label: '微信' },
      { prop: 'headUserId', label: '跟进人', itemType: 'select', options: [], remoteUrl: 'channel_selectDitchCharge', resultHandler: chSelectHandle, selectParams: { realName: '', exceptUserId: '' }, filterable: true },
      { prop: 'ditchStatus', label: '渠道状态', itemType: 'select', options: [{ label: '全部', value: '' }, { label: '未分配', value: 0 }, { label: '已分配', value: 1 }] }
    ]
  },
  columns: [
    { type: 'selection', width: 40 },
    { prop: 'ditchCode', label: '渠道编号', width: 150, sortable: true },
    { prop: 'name', label: '姓名', width: 150 },
    { prop: 'ditchPhone', label: '手机号', width: 150 },
    { prop: 'wechart', label: '微信', width: 150 },
    { prop: 'company', label: '单位', width: 200 },
    { prop: 'position', label: '职位', width: 200 },
    { prop: 'level', label: '渠道等级', width: 100 },
    { prop: 'commissionRate', label: '佣金比例(%)', width: 100 },
    { prop: 'sexTxt', label: '性别', width: 80 },
    { prop: 'employeeName', label: '跟进人', width: 80 },
    { prop: 'remarks', label: '备注', width: 150 },
    { prop: 'createTime', label: '创建时间', width: 180 },
    { prop: 'followTime', label: '最近跟进时间', width: 150 },
    { prop: 'ditchStatusTxt', label: '状态', width: 100 }
  ]
}

/**
 * 增加、修改弹窗参数
 */
// 渠道等级 下拉数据处理
const comSelectHandle = item => {
  return {
    label: item.level, value: item.id
  }
}

const diaOptions = {
  visible: false,
  status: 0,
  title: ['新增', '编辑'],
  init(cpnThis) {
    this.forms = [
      { prop: 'name', label: '姓名',
        rules: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      { prop: 'ditchPhone', label: '电话', rules: [{ message: '请输入正确的手机号', trigger: 'blur', validator: validatePhone }] },
      { prop: 'wechart', label: '微信' },
      { prop: 'company', label: '单位' },
      { prop: 'position', label: '职位' },
      { prop: 'source', label: '来源' },
      { prop: 'remarks', label: '备注' },
      { prop: 'ditchCommissionId', label: '渠道等级',
        rules: [{ required: true, message: '请选择渠道等级', trigger: 'blur' }],
        itemType: 'select', option: [], remoteUrl: 'channel_selectDitchCommission', resultHandler: comSelectHandle, change: cpnThis.onCommissionChange },
      { prop: 'commissionRate', label: '佣金比例', visible: false, loadingKey: 'selectCommissionPercentById',
        rules: [{ required: true, message: '请输入佣金比例，可精确到小数点后两位', trigger: 'blur' }]
      },
      { prop: 'sex', label: '性别', itemType: 'select', options: [{ label: '女', value: '0' }, { label: '男', value: '1' }, { label: '未知', value: '2' }] }
    ]
  },
  currentValue: {}
}

/**
 * 重新分配跟进人
 */
const refreshOptions = {
  visible: false,
  forms: [
    { prop: 'headUserId', label: '分配给', itemType: 'select', options: [], remoteUrl: 'channel_selectDitchCharge', resultHandler: chSelectHandle, selectParams: { realName: '', exceptUserId: '' }, filterable: true }
  ]
}

/**
 * 跟进弹窗参数
 */
const followUpOptions = {
  visible: false,
  title: '跟进情况',
  forms: [
    { prop: 'remarks', label: '跟进情况', itemType: 'textarea', rows: '3', placeholder: '请输入50字以内的内容',
      rules: [
        { required: true, message: '请填写跟进情况', trigger: 'blur' },
        { max: 50, message: '请输入50以内的内容', trigger: 'blur' }
      ]
    }
  ]
}

/**
 *跟进详情弹窗参数
 */
const followUpDetailOptions = {
  visible: false,
  title: '跟进详情',
  formOption: {
    forms: [
      { prop: ['followTimeStart', 'followTimeEnd'], label: '时间范围', itemType: 'daterange', defaultVaule: [new Date(), new Date()], parseRule: 'YYYY-MM-DD',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > new Date() || time.getTime() < (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
          }
        }
      }
    ]
  },
  column: [
    { prop: 'employeeName', label: '跟进人' },
    { prop: 'followTime', label: '跟进时间' },
    { prop: 'followRemark', label: '跟进情况' }
  ],
  params: { ditchId: '' }
}

export default{
  name: 'ChannnelManage',
  components: { SearchTablePagination, BaseForm },
  data() {
    return {
      mainTableOption,
      followUpOptions,
      followUpDetailOptions,
      diaOptions,
      selections: [],
      refreshOptions
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
  created() {
    diaOptions.init(this)
  },
  methods: {
    // 表格数据处理
    handleTableData(item, index) {
      const statusTxts = ['未分配', '已分配']
      const sexTxts = ['女', '男', '未知']
      // 日期处理
      item.createTime = parseTime(item.createTime)
      item.followTime = item.followTime ? parseTime(item.followTime) : ''
      item.ditchStatusTxt = statusTxts[item.ditchStatus]
      item.sexTxt = sexTxts[item.sex]
      return item
    },
    // 跟进详情日期数据处理
    handlefollowUpDetailData(item, index) {
      // 日期处理
      item.followTime = parseTime(item.followTime)
      return item
    },
    // 新增、编辑表格数据弹窗
    handleData(row) {
      // 重置
      let currentValue = {}
      let status = 0
      if (row) {
        // 编辑
        status = 1
        this.diaOptions.forms = this.diaOptions.forms.map(item => {
          if (item.prop.indexOf('commissionRate') !== -1) {
            item.visible = true
          }
          return item
        })
        currentValue = row
      }
      this.diaOptions = Object.assign(this.diaOptions, { visible: true, status, currentValue })
      // 清空历史数据，并设置当前值
      this.$nextTick(() => {
        this.$refs.diaform.reset()
      })
    },
    // 渠道等级选择
    onCommissionChange(id) {
      // 打开佣金比例
      this.diaOptions.forms = this.diaOptions.forms.map(item => {
        if (item.prop.indexOf('commissionRate') !== -1) {
          item.visible = true
        }
        return item
      })
      request('selectCommissionPercentById', { id }, { loadKey: 'selectCommissionPercentById' }).then(res => {
        this.diaOptions.currentValue = { commissionRate: res.data }
        this.$nextTick(() => {
          this.$refs.diaform.setCurrentVal()
        })
      })
    },
    // 保存
    saveData() {
      const path = ['saveDitch', 'updateDitch']
      this.$refs.diaform.getParams((error, formParams) => {
        if (!error) {
          const params = {
            ...formParams
          }
          if (this.diaOptions.status === 1) {
            // 编辑旧数据
            params.id = this.diaOptions.currentValue.id
          }
          request(path[this.diaOptions.status], params, { loadKey: 'saveDitch' }).then(res => {
            // 关闭弹窗
            this.diaOptions.visible = false
            // 更新table数据
            this.$refs.searchTable.fetchHandler()
          })
        }
      })
    },
    // 删除
    handleDelete(row) {
      MessageBox.confirm(
        '确认删除此记录吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        request('delDitch', { id: row.id }, { loadKey: 'delDitch' }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$refs.searchTable.fetchHandler()
        })
      })
    },
    // 多选 选中值保存
    selectchange(arr) {
      this.selections = arr
    },
    // 重新分配
    refreshData() {
      this.refreshOptions.visible = true
      // 清空表单
      this.$refs.refreshForm.reset()
    },
    // 保存重新分配
    saveRefresh() {
      const idList = this.selections.map(item => item.id)
      this.$refs.refreshForm.getParams((error, formParams) => {
        if (!error) {
          const params = {
            ...formParams, idList
          }
          request('reallocate', params, { loadKey: 'reallocate' }).then(res => {
            this.refreshOptions.visible = false
            this.$refs.searchTable.fetchHandler()
          })
        }
      })
    },
    // 跟进
    followUp(row) {
      this.followUpOptions = Object.assign(this.followUpOptions, { currentValue: row, visible: true })
      // 清空表单
      this.$refs.followUpForm.reset()
    },
    // 提交跟进内容
    handleFollowUp() {
      const { currentValue: { id }} = this.followUpOptions
      this.$refs.followUpForm.getParams((error, formParams) => {
        if (!error) {
          const params = {
            ...formParams, id
          }
          request('followUp', params, { loadKey: 'followUp' }).then(res => {
            this.followUpOptions.visible = false
            this.$refs.searchTable.fetchHandler()
          })
        }
      })
    },
    // 跟进详情
    followUpDetail(row) {
      // 更新参数
      this.followUpDetailOptions = Object.assign(this.followUpDetailOptions, { visible: true, params: { ditchId: row.id }})
      // 每次点击请求接口
      this.$refs.followSearchTable.fetchHandler()
      this.$refs.followSearchTable.$refs.searchForm.resetForm()
    }

  }

}

</script>
