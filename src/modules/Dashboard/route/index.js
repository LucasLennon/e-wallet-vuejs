export default [
  {
    path: "/dashboard",
    name: "dashboardPage",
    meta: {
      title: "Bem vindo!"
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Dashboard.page.vue")
  }
];
