<template>
  <div class="app-container">
    <div class="filter-container">
      <search-table-pagination
        ref="searchTable"
        :data="tableData"
        :page-sizes="[5, 10]"
        :columns="columns"
        :form-options="formOptions"
        :url="url"
        border
        type="remote">
        <template slot="">
          <el-row align="center">
            <el-row>
              <el-button
                size="mini"
                type="success"
                plain
                icon="el-icon-circle-plus"
                @click="handleCreate()">新增</el-button>
            </el-row>
          </el-row>
        </template>
        <template slot="append">
          <el-table-column label="跟进" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUpdate(scope.row)">跟进</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进详情" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUpdate(scope.row)">跟进详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </search-table-pagination>
      <!-- 新增、修改弹框 -->
      <el-dialog
        v-loading="loading"
        :visible.sync="diaOptions.visible"
        :title="diaOptions.title[diaOptions.status]"
        :close-on-press-escape="diaOptions.closeable"
        :close-on-click-modal="diaOptions.closeable"
        width="40%"
        center>
        <base-form
          ref="diaform"
          v-bind="diaFormOptions"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="diaOptions.visible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="diaOptions.status===0?createData():updateData()">
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
import { request } from '@/utils/request'

/**
 * SearchTablePagination 组件传递参数
 * formOptions 检索
 * columns 表格列信息
 *  */
const formOptions = {
  inline: true,
  showResetBtn: true,
  submitBtnText: '查询',
  resetBtnText: '重置',
  size: 'mini',
  // 表单内容 prop值为接口对应的参数名
  forms: [
    { prop: 'name', label: '姓名' },
    { prop: 'mobile', label: '电话' },
    { prop: 'wx', label: '微信' },
    { prop: 'wx2', label: '渠道状态', itemType: 'select', options: [{ label: '全部', value: '0' }, { label: '未分配', value: '2' }, { label: '已分配', value: '3' }] }
  ]
}

const columns = [
  { type: 'selection', width: 40 },
  { prop: 'channelNum', label: '渠道编号' },
  { prop: 'mobile', label: '姓名' },
  { prop: 'tel', label: '手机号' },
  { prop: 'wx', label: '微信' },
  { prop: 'company', label: '单位' },
  { prop: 'position', label: '职位' },
  { prop: 'level', label: '渠道等级' },
  { prop: 'percent', label: '佣金比例(%)' },
  { prop: 'sex', label: '性别' },
  { prop: 'remarks', label: '备注' },
  { prop: 'createTime', label: '创建时间', width: 100 },
  { prop: 'trackTime', label: '最近跟进时间', width: 150 },
  { prop: 'status', label: '状态' }
]

/**
 * 弹窗参数
 */
const diaOptions = {
  closeable: false,
  visible: false,
  status: 0,
  title: ['新增', '编辑'],
  center: true
}

const diaFormOptions = {
  inline: false,
  size: 'small',
  labelWidth: '80px',
  forms: [
    { prop: 'name', label: '姓名', rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }] },
    { prop: 'mobile', label: '电话', rules: [{ message: '请输入正确的手机号', trigger: 'blur', validator: validatePhone }] },
    { prop: 'wx', label: '微信' },
    { prop: 'wx1', label: '单位' },
    { prop: 'wx2', label: '职位' },
    { prop: 'wx3', label: '备注' },
    { prop: 'sex4', label: '渠道等级', itemType: 'select',
      options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }, { label: 'D', value: 'D' }],
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }] },
    { prop: 'sex5', label: '性别', itemType: 'select', options: [{ label: '男', value: '0' }, { label: '女', value: '1' }] }
  ]
}

export default{
  name: 'ChannnelManage',
  components: { SearchTablePagination, BaseForm },
  data() {
    return {
      loading: false,
      dialogFormVisible: true,
      formOptions,
      url: ['channel', 'getData'],
      columns,
      tableData: [

      ],
      diaFormOptions,
      diaOptions
    }
  },
  computed: {
    loadSelectCharge() {
      return this.$store.getters.singleLoading('selectCharge')
    }
  },
  mounted() {
    this.getCharge()
  },
  methods: {
    // 获取负责人
    getCharge() {
      const params = {
        employeeName: '',
        page: 1,
        start: 0,
        limit: 25
      }
      request(['channel', 'selectCharge'], params, { loadKey: 'selectCharge' }).then(res => {

      }).catch(error => {
        console.error('Get remote data failed. ', error)
        const that = this
        setTimeout(function() {
          that.loading = false
        }, 2000)
      })
    },
    handleUpdate() {

    },
    handleDelete() {

    },
    handleCreate() {
      this.diaOptions.visible = true
      this.$nextTick(() => {
        this.$refs.diaform.resetForm()
        this.$refs.diaform.clearvalidate()
      })
    },
    createData() {
      this.loading = true
      this.$refs.diaform.getParams((error, formParams) => {
        if (!error) {
          const params = {
            ...formParams
          }
          request(['channel', 'addData'], params, { loadKey: 'add' }).then(res => {
            // 添加成功
            this.diaOptions.visible = false
            this.$refs.searchTable.searchHandler()
          }).catch(error => {
            console.error('Get remote data failed. ', error)
            const that = this
            setTimeout(function() {
              that.diaOptions.visible = false
              that.loading = false
            }, 2000)
          })
        }
      })
    }
  }

}

</script>
