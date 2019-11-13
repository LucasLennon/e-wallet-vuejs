import LocalTransaction from "@/core/services/LocalTransaction";

export default {
  namespaced: true,
  state:{},
  mutations: {},
  actions: {
    async requestTransaction(_, payload) {
      return await LocalTransaction.saveTransaction(payload);
    }
  }
};