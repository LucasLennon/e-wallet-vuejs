export default [
  {
    path: "/extract",
    name: "extractPage",
    meta: {
      title: "Seu extrato"
    },
    component: () => import("../pages/Extract.page.vue")
  }
];
