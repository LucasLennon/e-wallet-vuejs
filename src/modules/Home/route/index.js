export default [
  {
    path: "/home",
    name: "homePage",
    meta: {
      title: "Bem vindo!"
    },
    component: () => import(/* webpackChunkName: "about" */ "../pages/Home.page.vue")
  },
];
