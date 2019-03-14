import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import Directives from './directives'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(Element, {})
Object.keys(Directives).map(key => {
  Vue.use(Directives[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
