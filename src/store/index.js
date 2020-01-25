import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.userId = decodeJwt(data.token).user_id
      }
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
