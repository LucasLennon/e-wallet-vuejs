export default [
  {
    path: "/dashboard",
    name: "dashboardPage",
    meta: {
      title: "Bem vindo!"
    },
    component: () =>
      import("../pages/Dashboard.page.vue")
  }
];
