// import LocalApi from "@/core/services/LocalApi";
import LocalUser from "@/core/services/LocalUser";
import LocalTransaction from "@/core/services/LocalTransaction";
import LocalToken from "@/core/services/LocalToken";

export default {
  namespaced: true,
  state:{
    userCurrencyList: null,
    user: null,
  },
  mutations: {
    SET_USER_CURRENCY(state, payload){
      state.userCurrencyList = payload;
    },
    SET_USER(state, payload){
      state.user = payload;
    }
  },
  actions: {
    async requestLogin(_, payload){
      const { data } = await LocalToken.login(payload);
      localStorage.setItem("token", data.token);
      return data;
    },
    async requestUser({commit}){
      const token = localStorage.getItem("token")
      // await LocalAPI.accessDB();
      const { data } = await LocalUser.getUser(token);
      commit("SET_USER", data);
      commit("SET_USER_CURRENCY", data.currency);
      return data;
    },
    async requestLogout({commit}){
      commit("SET_USER", null);
      localStorage.removeItem("token");
    },
    async registerNewUser(_, payload) {
      // await LocalAPI;
      try {
        const response = await LocalUser.addToUsers(payload);
        return response;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};