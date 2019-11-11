import MainStore from "@/core/store";

export default [
  {
    path: "/exchange",
    name: "exchangePage",
    meta: {
      title: "Trocas"
    },
    component: () => import("../pages/Exchange.page.vue"),
    beforeEnter: async (to, from, next) => {
      MainStore.dispatch("getBitcoinInfo");
      MainStore.dispatch("getDolarInfo");
      MainStore.dispatch("loginAndRegistration/requestUser");
      next()
    }
  }
];
