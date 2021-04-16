import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null, //用户
    identity: '', //身份
    tabKey: 0,
    own: false,
    modify: false,
    activeIndex: "1"
  },
  mutations: {
    CHANGE_USER(state, date) {
      state.user = date
    },
    CHANGE_IDENTITY(state, date) {
      state.identity = date
    },
    CHANGE_TABKEY(state, date) {
      state.tabKey = date
    },
    CHANGE_OWN(state, date) {
      state.own = date
    },
    CHANGE_MODIFY(state, date) {
      state.modify = date
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
        paths: ["user", "identity", "tabKey", 'own', 'modify', 'activeIndex']
    })
  ]
})
