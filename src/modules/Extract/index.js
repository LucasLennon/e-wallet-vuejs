import MainRoute from "@/core/router";
import MainStore from "@/core/store";


import moduleLocalRoute from './routes'
import moduleLocalStore from './store'

MainStore.registerModule("extract", moduleLocalStore);
MainRoute.addRoutes(moduleLocalRoute);
MainStore.dispatch("addDrawerItem", {
  name: "extractPage",
  icon: "fa-receipt",
  title: "Extrato"
});