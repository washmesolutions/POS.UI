import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import vco from "v-click-outside"
import VueApexCharts from 'vue-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2';
import VueSlideBar from 'vue-slide-bar'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import store from '@/state/store'

import App from './App.vue'
import VueMask from 'v-mask'

Vue.config.productionTip = false


import { configureFakeBackend } from './api/authentication/fack-backend';
import Lightbox from 'vue-easy-lightbox'
 
configureFakeBackend();

Vue.use(Lightbox)

import '@/assets/scss/app.scss'
Vue.component('VueSlideBar', VueSlideBar)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);

Vue.use(require("vue-chartist"));
Vue.use(VueMask);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
