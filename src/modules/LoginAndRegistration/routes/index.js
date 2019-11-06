export default [
  {
    path: "/login",
    name: "loginPage",
    component: () =>
      import("../pages/Login.page.vue")
  },
  {
    path: "/registration",
    name: "registrationPage",
    component: () =>
      import("../pages/Registration.page.vue")
  }
];
