import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import { store } from "./store";
import { router } from "./router";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.filter('fCurrency', (value)=>new Intl.NumberFormat('zh-Hans-CN', { style:'currency', currency: 'CNY' }).format(value));

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
