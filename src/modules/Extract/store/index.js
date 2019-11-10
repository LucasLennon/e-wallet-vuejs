import LocalTransaction from "@/core/services/LocalTransaction";

export default {
  namespaced: true,
  state:{
    transactions: null,
  },
  mutations: {
    SET_TRANSACTIONS(state, payload){
      state.user = payload;
    }
  },
  actions: {
    async requestAllTransactions({dispatch, commit, rootState}){
      if (!!rootState.loginAndRegistration.user == false) {
        await dispatch("loginAndRegistration/requestUser", undefined, {
          root: true
        });
      }
      const user = rootState.loginAndRegistration.user;
      const { data } = await LocalTransaction.getUserTransactions(user);
      commit("SET_TRANSACTIONS", data);
      return data;
    },
  }
};