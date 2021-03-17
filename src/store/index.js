import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabKey: 0
  },
  mutations: {
    CHANGE_TABKEY(state, date) {
      state.tabKey = date
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
        paths: ["tabKey"]
    })
  ]
})
