import Vue from 'vue'
import App from '@/core/App.vue'

import LocalAPI from "@/core/services/LocalApi";
new LocalAPI();

import router from './core/router'
import store from './core/store'
import vuetify from './core/plugins/vuetify';
import './core/plugins/vue-the-mask';
import './core/plugins/vue-currency-input';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import "./modules/LoginAndRegistration";
import "./modules/Dashboard";
import "./modules/Exchange";
import "./modules/Extract";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
