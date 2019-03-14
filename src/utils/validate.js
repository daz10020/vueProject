import { request } from '@/utils/request'
import { getType } from '@/utils/index'
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 手机号
export const validatePhone = (rule, value, callback) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/
  if (value !== '') {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码'))
      return
    }
  }
  callback()
}

// 数字
export function validateNum(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}

// 字母、数字或下划线
export const CO_REG = /^[0-9a-zA-Z_]+$/

export const NUM_REG = /^[0-9]*$/
// 正整数
export const POSITIVE_NUM_REG = /^[1-9]\d*$/

// 非负正数
export const NON_NEGATIVE_NUM_REG = /^[1-9]\d*|0$/

// 输入框唯一性验证
export const validateDictCode = (url, message, key) => function(rule, value, callback, sourse, options) {
  let params = {}
  if (key !== undefined) {
    params = Object.assign(params, this.that.validateObj[key])
  }
  params = Object.assign(params, sourse)
  request(url, params, { loadKey: key }).then(res => {
    const { isRepeat } = res.data
    if (isRepeat) {
      callback(new Error(message))
    } else {
      callback()
    }
  }).catch(error => {
    console.error('Get remote data failed. ', error)
    // 失败回调
    callback(new Error('数据唯一性校验请求失败'))
  })
}

// 验证form的值
export const propsTypeValidator = (item, Setting) => {
  const resData = {
    ...item
  }
  Object.keys(Setting).forEach(key => {
    let { [key]: propVal } = item
    const { [key]: propSetting } = Setting
    if (String.toString.call(key, propVal, propSetting) !== '[object Object]') {
      return contrastType(propSetting)
    }
    const { required, default: def, validator } = propSetting

    const absent = item.hasOwnProperty(key)

    if (required && absent) {
      throw new Error(`Missing required prop:"${key}`)
    }

    if (!absent && propSetting.hasOwnProperty('default')) {
      propVal = def
    }

    if (required && propVal == null) {
      return
    }

    if (validator && !validator(propVal)) {
      throw new Error(`Invalid prop: custom validator check failed for prop "${key}".`)
    }
    resData[key] = propVal
  })
  return resData
}

export const contrastType = (key, val, type) => {
  let valid = !type || type === true
  const expectedTypes = []

  if (type) {
    if (!Array.isArray(type)) {
      type = [type]
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const { expectedType, valid: vRes } = assertType(val, type[i])
      expectedTypes.push(expectedType || '')
      valid = vRes
    }
  }

  if (!valid) {
    throw new Error(`
        Invalid prop: type check failed for prop "${key}".
        Expected ${expectedTypes.join(', ')}
      `)
  }
}

// 验证类型
export const assertType = (value, type) => {
  let valid
  const expectedType = getType(type)
  if ('String|Number|Boolean|Function'.indexOf(expectedType) !== -1) {
    valid = typeof value === (expectedType.toLowerCase())
  } else if (expectedType === 'Object') {
    valid = String.toString.call(value) === '[object Object]'
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value)
  } else {
    valid = value instanceof type
  }
  return {
    valid,
    expectedType
  }
}
