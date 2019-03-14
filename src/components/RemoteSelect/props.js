export const props = {
  // 请求路径
  remoteUrl: String,
  // 额外参数
  selectParams: {
    type: Object,
    default: () => ({})
  },
  // 异步数据格式化
  resultHandler: {
    type: Function
  },
  // 额外参数改变时从头加载
  resetOpt: {
    type: Boolean,
    default: true
  },
  // 以下同elementUI配置
  prop: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'mini',
    validator: sizeValidator
  },
  filterable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  itemWidth: Number,
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  }
}

function sizeValidator(value) {
  const methodTypes = ['large', 'small', 'mini']
  const valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`Size must be one of ['large', 'small', 'mini']`)
  }
  return valid
}
