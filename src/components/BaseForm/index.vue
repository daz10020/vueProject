<template>
  <el-form
    v-loading="submitLoading"
    ref="form"
    :model="params"
    v-bind="props"
  >
    <!-- 表单元素 -->
    <FormItem
      v-for="(formItem, index) in showForms"
      :key="index + '_formItem'"
      :ref="formItem.prop"
      v-bind="formItem"
      @handleChange="formItemChange"
    />
    <!-- 按钮 -->
    <el-form-item
      v-if="btns && btns.length"
    >
      <FormButton
        v-for="(btn, index) in btns"
        :key="index + '_btn'"
        v-bind="btn"
        :handle-event-ctrl="handleEventCtrl"
      />
    </el-form-item>
    <slot name="append"/>
  </el-form>
</template>

<script>
import FormItem from '@/components/BaseForm/FormItem'
import FormButton from '@/components/BaseForm/FormButton'
import { mapGetters } from 'vuex'
import { formProps } from './props'

export default {
  name: 'BaseForm',
  components: {
    FormItem, FormButton
  },
  props: formProps,
  data() {
    const params = {}
    const format = {}
    const fuzzyOps = {}
    const { $props, forms, fuzzy } = this
    const showForms = forms.map(v => {
      const { fuzzy: vFuzzy, format: vFormat, prop } = v
      const propType = typeof prop

      if (propType === 'string') {
        params[prop] = ''
        fuzzyOps[prop] = vFuzzy || fuzzy
        format[prop] = vFormat
      } else if (Array.isArray(prop)) {
        prop.forEach(vv => {
          params[vv] = ''
          fuzzyOps[vv] = vFuzzy || fuzzy
          format[vv] = vFormat
        })
      }
      return v
    })
    return {
      params,
      showForms,
      props: $props,
      format,
      fuzzyOps
    }
  },
  computed: mapGetters['loading'],
  mounted() {
    this.reset(this.currentValue)
  },
  methods: {
    formItemChange(obj) {
      this.params = Object.assign(this.params, obj)
    },
    getParamFuzzy() {
      return this.fuzzyOps
    },
    handleEventCtrl(event) {
      return this[event]
    },
    // 表单赋值
    reset(row = {}) {
      const { showForms, $refs, params } = this
      showForms.forEach(v => {
        const { prop, defaultValue } = v
        const curVal = row.hasOwnProperty(prop) !== undefined ? row[prop] : defaultValue
        $refs[prop][0].resetVal(curVal)
        params[prop] = curVal
      })
      // callback && typeof callback === 'function' && callback(nVal, e)
    },
    // 表单提交验证
    handleFormValid(callback, e) {
      const { getParams, $refs } = this
      $refs.form.validate(valid => {
        callback && typeof callback === 'function' && callback(valid, getParams(), e)
      })
    },
    // 表单置空
    handleFormInit(callback, e) {
      const { showForms, $refs } = this
      showForms.forEach(item => {
        const { prop, defaultValue } = item
        $refs[prop][0].resetVal(defaultValue)
      })
      callback && typeof callback === 'function' && callback(e)
    },
    getParams(callback, e) {
      const { params, format } = this
      const formattedForm = {}
      Object.keys(params).forEach(v => {
        const pv = params[v]
        const fv = format[v]
        formattedForm[v] = fv ? fv(pv, v) : pv
      })
      callback && typeof callback === 'function' && callback(formattedForm, e)
      return formattedForm
    }
  }
}
</script>
