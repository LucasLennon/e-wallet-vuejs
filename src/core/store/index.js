import Vue from "vue";
import Vuex from "vuex";

import BitcoinAPI from "../services/Bitcoin";
import DolarCotationAPI from "../services/DolarCotationAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyTypes: [
      {
        simbolo: "BRL",
        nomeFormatado: "Real Brasileiro",
        tipoMoeda: "A"
      },
      {
        simbolo: "XBC",
        nomeFormatado: "BitCoin",
        tipoMoeda: "A"
      },
      {
        simbolo: "USD",
        nomeFormatado: "Dólar Americano",
        tipoMoeda: "A"
      },
      {
        simbolo: "XBT",
        nomeFormatado: "Britas",
        tipoMoeda: "A"
      }
    ],
    dolarInfo: null,
    bitcoinInfo: null,
    drawerItens: []
  },
  mutations: {
    ADD_DRAWER_ITEM(state, payload) {
      state.drawerItens.push(payload);
    },
    SET_BITCOIN_INFO(state, payload) {
      state.bitcoinInfo = payload;
    },
    SET_DOLAR_INFO(state, payload) {
      state.dolarInfo = payload;
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
