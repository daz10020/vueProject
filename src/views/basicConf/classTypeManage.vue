<template>
  <div class="app-container">
    <search-table-pagination
      ref="searchTable"
      :columns="columns"
      :form-options="formOptions"
      url="basicConf_clsTypeList"
    >
      <template slot="append">
        <el-table-column v-bind="baseSetting.column" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-bind="baseSetting.button"
              type="primary"
              @click="showDia(scope.row)">编辑</el-button>
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
            @click="showDia()">新增</el-button>
        </el-row>
      </template>
    </search-table-pagination>
    <!-- 新增、修改弹框 -->
    <el-dialog
      :visible.sync="diaVisible"
      :title="diaTitle"
      width="40%"
      @close="closeDia"
    >
      <base-form
        ref="diaform"
        :loading="loading['saveClsType']"
        v-bind="diaFormOptions"
        :init-value="activeRow"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchTablePagination from '@/components/SearchTablePagination'
import BaseForm from '@/components/BaseForm'
import { reqInit } from '@/utils/request'

export default{
  name: 'ChannnelManage',
  components: { SearchTablePagination, BaseForm },
  data() {
    // 表格行配置
    const columns = [
      { prop: 'classTypeDesc', label: '学科名称' },
      { prop: 'leadName', label: '学科负责人' },
      { prop: 'isEnabelDesc', label: '状态' }
    ]
    // 动态数据下拉框配置
    const selectOpt = {
      prop: 'leadBy', label: '学科负责人',
      itemType: 'select', remoteUrl: 'basicConf_userList',
      selectParams: { roleConfKey: 'subject.leader.role.codes' },
      labelKey: 'userName', valueKey: 'id', filterable: true
    }
    // 单选框
    const radioOpt = [
      { prop: 'isEnabel', itemType: 'radio', label: '状态', defaultValue: 1,
        options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]
      },
      { prop: 'id', visible: false }
    ]
    // 模态表单验证规则配置
    const rules = {
      classTypeDesc: [
        { required: true, message: '请输入学科名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      leadBy: [{ required: true, message: '请选择学科负责人', trigger: 'blur' }]
    }
    // 模态表单按钮配置
    const btns = [
      { btnType: 'submit', btnText: '保 存', type: 'primary', initialClick: this.saveData },
      { btnType: 'init', btnText: '关 闭', initialClick: this.hideDia }
    ]
    // 表单配置
    const forms = [columns[0], selectOpt]
    return {
      // 表格行
      columns,
      // 查询表单
      formOptions: { forms },
      // 模态层表单
      diaFormOptions: { forms: forms.concat(radioOpt), rules, btns },
      // 新增0修改1
      addOrUpd: 0,
      // 模态框显示
      diaVisible: false,
      // 行数据
      activeRow: {}
    }
  },
  computed: {
    ...mapGetters(['baseSetting', 'loading']),
    // 模态层title
    diaTitle() {
      const { scopeData: { titles }, addOrUpd } = this
      return titles[addOrUpd]
    }
  },
  created() {
    this.request = reqInit('basicConf')
    this.scopeData = {
      titles: ['新增', '编辑']
    }
  },
  updated() {
    // const { diaVisible, activeRow, $refs: { diaform }} = this
    // if (activeRow && diaVisible && diaform) {
    //   diaform.reset(activeRow)
    // }
  },
  methods: {
    // 显示模态层
    showDia(row) {
      Object.assign(this, {
        addOrUpd: row ? 1 : 0,
        diaVisible: true,
        activeRow: row || {}
      })
      const { diaform } = this.$refs
      diaform && diaform.reset(row)
    },
    // 隐藏模态层
    hideDia() {
      this.diaVisible = false
    },
    // 模态层关闭
    closeDia() {
      this.$refs['diaform'].handleFormInit()
    },
    // 保存
    saveData(valid, formParams) {
      if (!valid) return
      const { request, $refs } = this
      request('clsTypeSave', formParams, { loadKey: 'saveClsType' }).then(res => {
        // 关闭弹窗
        this.diaVisible = false
        // 更新table数据
        $refs['searchTable'].handleReload()
      })
    }
  }
}

</script>
