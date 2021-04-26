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
    activeIndex: "1",
    subjectId: 0, //课程ID
    coursewareID: 0, //课件ID
    projectId: 0, //工程ID
    parentProjectId: 0, //父工程ID
    toolId: 0, //工具ID
    examId: 0, //考核ID
    url: 'https://www.baidu.com', //工具地址
    record: true, //是否出现录制悬浮窗
    recordStatus: 0 //录制状态 0 默认 1 开始录制 2 结束录制
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
    },
    CHANGE_SUBJECTID(state, date) {
      state.subjectId = date
    },
    CHANGE_COURSEWAREID(state, date) {
      state.coursewareID = date
    },
    CHANGE_PROJECTID(state, date) {
      state.projectId = date
    },
    CHANGE_PARENTPROJECTID(state, date) {
      state.parentProjectId = date
    },
    CHANGE_TOOLID(state, date) {
      state.toolId = date
    },
    CHANGE_EXAMID(state, date) {
      state.examId = date
    },
    CHANGE_URL(state, date) {
      state.url = date
    },
    CHANGE_RECORD(state, date) {
      state.record = date
    },
    CHANGE_RECORDSTATUS(state, date) {
      state.recordStatus = date
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
        paths: ["user", "identity", "tabKey", 'own', 'modify', 'activeIndex', 'subjectId', 'coursewareID', 'projectId', 'parentProjectId', 'toolId', 'examId', 'url']
    })
  ]
})
