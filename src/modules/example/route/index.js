export default [
  {
    path: "/example",
    name: "example",
    component: () => import(/* webpackChunkName: "about" */ "../pages/Example.page.vue")
  },
];
