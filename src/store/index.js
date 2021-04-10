import Vue from 'vue'
import Vuex from 'vuex'
import initailState from './initialState.js'
import allActions from './actions.js'
import allMutations from './mutations.js'
import allGetters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...initailState
  },
  actions: {
    ...allActions
  },
  mutations: {
    ...allMutations
  },
  getters: {
    ...allGetters
  }
})
