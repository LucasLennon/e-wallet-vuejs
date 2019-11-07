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
    async requestLogin(_, payload){
      await LocalApi.accessDB()
      const { data } = await LocalApi.login(payload);
      localStorage.setItem("token", data.token);
      return data;
    },
    async requestUser({commit}){
      const token = localStorage.getItem("token")
      await LocalApi.accessDB()
      const { data } = await LocalApi.getUser(token);
      commit("SET_USER", data);
      return data;
    },
    async requestLogout({commit}){
      commit("SET_USER", null);
      localStorage.removeItem("token");
    },
    async registerNewUser(_, payload) {
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