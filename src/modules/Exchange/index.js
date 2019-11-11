import MainRoute from "@/core/router";
import MainStore from "@/core/store";


import moduleLocalRoute from './routes'
import moduleLocalStore from './store'

MainStore.registerModule("exchange", moduleLocalStore);
MainRoute.addRoutes(moduleLocalRoute);
MainStore.dispatch("addDrawerItem", {
  name: "exchangePage",
  icon: "fa-exchange-alt",
  title: "Trocas"
});