import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerItens: [
      
    ]
  },
  mutations: {
    ADD_DRAWER_ITEM(state, payload){
      state.drawerItens.push(payload);
    }
  },
  actions: {
    addDrawerItem({ commit }, payload) {
      commit("ADD_DRAWER_ITEM", payload);
    }
  },
  modules: {}
});
