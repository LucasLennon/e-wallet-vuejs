import MainRoute from "@/core/router";
import MainStore from "@/core/store";


import moduleLocalRoute from './route'
// import moduleLocalStore from './store'

// MainStore.registerModule("example", moduleLocalStore);
MainRoute.addRoutes(moduleLocalRoute);
MainStore.dispatch("addDrawerItem", {
  name: "dashboardPage",
  icon: "fa-home",
  title: "Dashboard"
});