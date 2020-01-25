import moment from 'moment'
import Vue from 'vue'

moment.locale('zh-cn')

Vue.filter('relativetime', value => {
  return moment(value).startOf('second').fromNow()
})

// 日期格式化
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
