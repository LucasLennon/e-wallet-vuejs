import Vue from "vue";
import Vuex from "vuex";

import BitcoinAPI from "../services/Bitcoin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bitcoinInfo: null,
    drawerItens: []
  },
  mutations: {
    ADD_DRAWER_ITEM(state, payload) {
      state.drawerItens.push(payload);
    },
    SET_BITCOIN_INFO(state, payload) {
      state.drawerItens.push(payload);
    }
  },
  actions: {
    addDrawerItem({ commit }, payload) {
      commit("ADD_DRAWER_ITEM", payload);
    },
    async getBitcoinInfo({ commit }) {
      const response = await BitcoinAPI.get();
      commit("SET_BITCOIN_INFO", response.ticker);
    }
  },
  modules: {}
});
