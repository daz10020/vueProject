<template>
  <el-button
    v-bind="props"
    @click="handleBtnClick"
  >
    {{ btnText }}
  </el-button>
</template>

<script>
import { mapGetters } from 'vuex'
const props = {
  /*
  * 按钮类型
  * 注：不触发表单native事件
  * @param submit 提交按钮，表单序列化后，将结果作为参数
  * @param reset  重置按钮，清理表单
  * @param button 默认按钮
  * */
  btnType: {
    type: String,
    default: 'button'
  },
  // 按钮文字
  btnText: String,
  // 回调函数
  initialClick: Function,
  // 提交函数
  handleEventCtrl: Function,
  // 同elementUI
  size: {
    type: String,
    default: 'mini'
  },
  type: String,
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: String,
  autofocus: Boolean,
  nativeType: String
}

// 按钮类型对应表单事件
const getClickFun = {
  submit: 'handleFormValid',
  init: 'handleFormInit',
  // reset: 'reset',
  getParams: 'getParams'
}
export default {
  name: 'FormButton',
  props,
  data() {
    return {
      props: this.$props
    }
  },
  computed: { ...mapGetters(['baseSetting']) },
  created() {
    const { btnType, initialClick, handleEventCtrl } = this
    // 获取对应表单函数名
    const emitEventKey = getClickFun[btnType]
    // 获取对应表单函数
    const emitFunc = handleEventCtrl(emitEventKey)
    // 执行回调
    this.handleBtnClick = emitEventKey && typeof emitFunc === 'function' ? (e) => emitFunc(initialClick, e) : initialClick
  }
}
</script>

<style scoped>

</style>
