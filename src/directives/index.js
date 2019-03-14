
const directives = {}
// 读取所有js文件
const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  directives[moduleName] = requireModule(fileName).default
})
export default directives
