import MainStore from "@/core/store";

export default [
  {
    path: "/extract",
    name: "extractPage",
    meta: {
      title: "Seu extrato"
    },
    component: () => import("../pages/Extract.page.vue"),
    beforeEnter: async (to, from, next) => {
      await MainStore.dispatch("loginAndRegistration/requestUser");
      next()
    }
  }
];
