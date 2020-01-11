import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 设置rem基准值
import 'amfe-flexible'
// 表单验证组件
import './utils/validation.js'
// 插入vant组件
import './utils/register-vant'
// 引入less样式
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
