import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem('user'),
    arr: ['TabBar']

  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.userId = decodeJwt(data.token).user_id
      }
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    },
    addarr (state, name) {
      if (!state.arr.includes(name)) {
        state.arr.push(name)
      }
    },
    removearr (state, name) {
      const index = state.arr.indexOf(name)
      if (index !== -1) {
        state.arr.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
