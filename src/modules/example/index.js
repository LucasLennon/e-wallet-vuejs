import MainRoute from "@/core/router";
import MainStore from "@/core/store";


import moduleLocalRoute from './route'
import moduleLocalStore from './store'

MainStore.registerModule("example", moduleLocalStore);
MainRoute.addRoutes(moduleLocalRoute);