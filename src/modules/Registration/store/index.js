import LocalApi from "@/core/services/LocalApi";

export default {
  namespaced: true,
  actions: {
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