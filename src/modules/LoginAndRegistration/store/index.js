import LocalApi from "@/core/services/LocalApi";

export default {
  namespaced: true,
  state:{
    user: null,
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload;
    }
  },
  actions: {
    async requestLogin({commit}, payload){
      LocalApi.accessDB()
      const { data } = await LocalApi.login(payload);
      commit("SET_USER", data);
    },
    async requestLogout({commit}){
      commit("SET_USER", null);
    },
    async registerNewUser({ commit }, payload) {
      await LocalApi.accessDB();
      try {
        const response = await LocalApi.addToUsers(payload);
        return response;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};