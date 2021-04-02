import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabKey: 0,
    options: {
      classify: '全部',
      ifOnline: '全部',
      status: '全部',
      state: '全部'
    },
    activeIndex: "1"
  },
  mutations: {
    CHANGE_TABKEY(state, date) {
      state.tabKey = date
    },
    CHANGE_OPTIONS(state, date) {
      state.options[date[0]] = date[1]
    },
    CHANGE_ACTIVEINDEX(state, date) {
      state.activeIndex = date
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
        paths: ["tabKey", 'activeIndex']
    })
  ]
})
