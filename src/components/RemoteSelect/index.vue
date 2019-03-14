<template>
  <el-select
    v-loading="loading[loadKey]"
    v-selectscroll="handleScroll"
    v-model="value"
    v-bind="$props"
  >
    <el-option
      v-for="(op, opIndex) in selectOptions"
      :key="opIndex + '_remote'"
      :value="op.formatValue"
      :label="op.formatLabel"/>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { props } from './props'
import { request } from '@/utils/request'

export default {
  name: 'RemoteSelect',
  props,
  data() {
    return {
      value: '',
      selectOptions: [],
      loadFlg: false,
      pages: 1,
      pageNo: 1,
      pageSize: 20,
      loadKey: `remote_select${new Date().getTime()}`
    }
  },
  computed: { ...mapGetters(['loading']) },
  watch: {
    // 依赖配置修改，重新加载下拉框内数据
    selectParams() {
      this.reloadData(this.$props.resetOpt)
    },
    // 监听选中
    value(val) {
      this.$emit('handleChange', val)
    }
  },
  created() {
    this.getRemoteData()
  },
  methods: {
    // 重置
    resetVal(value = '') {
      this.value = value
    },
    reloadData(resetOpt = true) {
      resetOpt && Object.assign(this, {
        pageNo: 1,
        pages: 1,
        selectOptions: []
      })
      this.getRemoteData()
    },
    getRemoteData() {
      const { loadFlg, pages, pageNo } = this
      if (loadFlg || pages < pageNo) { return }
      this.loadFlg = true
      // 获取配置
      const { remoteUrl, resultHandler, selectParams = {}, pageSize, selectOptions, loadKey, labelKey, valueKey } = this
      // 请求
      request(remoteUrl, {
        pageNo, pageSize,
        ...selectParams
      }, { loadKey }).then(response => {
        const { data, data: { list, pageCount = 1, pageSize = 20 }} = response
        let result = []
        if (Array.isArray(data)) {
          // 数据无分页情况
          result = data
        } else if (Array.isArray(list)) {
          // 数据分页情况
          result = list
        }
        resultHandler && typeof resultHandler === 'function' && result.forEach(resultHandler)
        const res = result.map(item => {
          return typeof item === 'object' ? {
            ...item,
            formatValue: item[valueKey],
            formatLabel: item[labelKey]
          } : {
            formatValue: item,
            formatLabel: item
          }
        })
        Object.assign(this, {
          selectOptions: [].concat(selectOptions, res),
          pageNo, pageCount, pageSize,
          loadFlg: false
        })
      }).catch(err => {
        console.log(err)
        this.loadFlg = false
      })
    },
    /** *******************************
     ** Fn: handleScroll
     ** Intro: 处理滚动行为
     ** @params: direction 为true代表向下滚动,为false代表向上滚动
     *********************************/
    handleScroll(direction) {
      if (direction) {
        // 请求下一页的数据
        this.pageNo = ++this.pageNo
        this.getRemoteData()
      }
    }
  }
}

</script>
