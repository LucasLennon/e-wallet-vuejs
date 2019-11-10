import Vue from "vue";
import Vuex from "vuex";

import BitcoinAPI from "../services/Bitcoin";
import DolarCotationAPI from "../services/DolarCotationAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dolarInfo: null,
    bitcoinInfo: null,
    drawerItens: []
  },
  mutations: {
    ADD_DRAWER_ITEM(state, payload) {
      state.drawerItens.push(payload);
    },
    SET_BITCOIN_INFO(state, payload) {
      state.bitcoinInfo.push(payload);
    },
    SET_DOLAR_INFO(state, payload) {
      state.dolarInfo.push(payload);
    }
  },
  actions: {
    addDrawerItem({ commit }, payload) {
      commit("ADD_DRAWER_ITEM", payload);
    },
    async getBitcoinInfo({ commit }) {
      const response = await BitcoinAPI.get();
      commit("SET_BITCOIN_INFO", response.ticker);
    },
    async getDolarInfo({ commit }) {
      const response = await DolarCotationAPI.get();
      commit("SET_DOLAR_INFO", response.value);
    }
  },
  modules: {}
});
