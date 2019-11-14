import MainStore from "@/core/store";

export default [
  {
    path: "/dashboard",
    name: "dashboardPage",
    meta: {
      title: "Bem vindo!"
    },
    component: () => import("../pages/Dashboard.page.vue"),
    beforeEnter: async (to, from, next) => {
      MainStore.dispatch("getBitcoinInfo");
      MainStore.dispatch("getDolarInfo");
      MainStore.dispatch("loginAndRegistration/requestUser");
      next();
    }
  }
];
