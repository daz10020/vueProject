
<template>
  <BaseForm
    ref="form"
    v-bind="props"
    :inline="true"
  />
</template>

<script>
import BaseForm from '@/components/BaseForm'
import { formProps } from '@/components/BaseForm/props'

const props = {
  ...formProps,
  submitHandler: {
    type: Function,
    required: true
  },
  showResetBtn: {
    type: Boolean,
    default: true
  },
  submitBtnText: {
    type: String,
    default: '查询'
  },
  resetBtnText: {
    type: String,
    default: '重置'
  }
}
export default {
  name: 'ElSearchForm',
  components: { BaseForm },
  props,
  data() {
    const { btns = [], showResetBtn, submitBtnText, resetBtnText, submitHandler } = this
    const searchBtns = [{
      prop: 'searchSubmit',
      btnType: 'getParams',
      initialClick: submitHandler,
      btnText: submitBtnText
    }]
    showResetBtn && searchBtns.push({
      prop: 'searchReset',
      btnType: 'init',
      btnText: resetBtnText
    })
    btns.push(...searchBtns)
    return {
      props: { ...this.$props, btns }
    }
  },
  mounted() {
    const { getParams, handleFormInit } = this.$refs.form
    Object.assign(this, {
      getParams, handleFormInit
    })
  }
}
</script>
