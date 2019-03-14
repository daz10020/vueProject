import { props as selectProps } from '@/components/RemoteSelect/props'
export const formProps = {
  size: {
    type: String,
    default: 'small',
    validator: sizeValidator
  },
  inline: {
    type: Boolean,
    default: false
  },
  fuzzy: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: String,
    default: '95px'
  },
  itemWidth: Number,
  submitLoading: String,
  resetHandler: Function,
  submitHandler: Function,
  forms: {
    type: Array,
    required: true
  },
  btns: {
    type: Array,
    default: () => ([])
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  currentValue: {
    type: Object,
    default: () => ({})
  }
}

export const formItemProps = {
  ...selectProps,
  // 字段key
  prop: {
    type: [String, Array],
    required: true
  },
  // 显示隐藏
  visible: {
    type: Boolean,
    default: true
  },
  // label
  label: String,
  // 表单项目类型
  itemType: {
    type: String,
    default: 'input',
    validator: itemTypeValidator
  },
  // 默认值
  defaultValue: {},
  // input标签的type属性值
  inpType: {
    type: String,
    default: 'text'
  },
  type: String,
  size: {
    type: String,
    default: 'mini',
    validator: sizeValidator
  },
  placeholder: {
    type: String,
    default: ''
  },
  startHolder: {
    type: String,
    default: ''
  },
  endHolder: {
    type: String,
    default: ''
  },
  rules: Array,
  handleSelectChange: Function,
  options: Array,
  pickerOptions: Object,
}

function sizeValidator(value) {
  const methodTypes = ['large', 'small', 'mini']
  const valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`Size must be one of ['large', 'small', 'mini']`)
  }
  return valid
}

function itemTypeValidator(value) {
  const methodTypes = ['input', 'number', 'select', 'date', 'daterange', 'radio', 'textarea']
  const valid = methodTypes.indexOf(value.toLowerCase()) !== -1
  if (!valid) {
    throw new Error(`ItemType must be one of [${methodTypes.join(', ')}]`)
  }
  return valid
}
