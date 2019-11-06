import MainRoute from "@/core/router";
import MainStore from "@/core/store";


import moduleLocalRoute from './routes'
import moduleLocalStore from './store'

MainStore.registerModule("loginAndRegistration", moduleLocalStore);
MainRoute.addRoutes(moduleLocalRoute);