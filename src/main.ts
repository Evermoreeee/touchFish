import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as Vuetensils from  "vuetensils"
import '@/scss/index.scss'

Vue.config.productionTip = false
Vue.component("VDrawer", Vuetensils.VDrawer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
