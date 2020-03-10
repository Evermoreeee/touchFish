import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as Vuetensils from  "vuetensils"
import '@/scss/index.scss'
import Toasted from 'vue-toasted';
import 'vant/lib/index.css';
import vant from 'vant';
import './icons'
Vue.use(vant)

Vue.config.productionTip = false
Vue.component("VDrawer", Vuetensils.VDrawer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
