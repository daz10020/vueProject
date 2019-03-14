/**
 * 汇总接口地址数据、
 * @TypeOf Object or String
 * @Formatter 'module,key'(key 命名时不可使用_)
 */
const apis = {}
// 读取所有js文件
const requireModule = require.context('.', false, /[^(index)]\.js$/)
requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  apis[moduleName] = requireModule(fileName).default
})

/*
* 获取请求接口
* @Params key
* @Typeof String
* */
export const getApi = key => {
  if (key.indexOf('_') === -1) {
    return apis[key]
  } else {
    let api = apis
    key.split('_').forEach(k => {
      api = api[k]
    })
    return api
  }
}
