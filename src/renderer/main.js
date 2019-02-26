import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import mixin from '@/mixin'

// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import '../../assets/photon-0.1.2-alpha/dist/css/photon.css'

import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

// Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  mixins: mixin,
  template: '<App/>'
}).$mount('#app')
