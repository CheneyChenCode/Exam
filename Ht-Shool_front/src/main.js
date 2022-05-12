import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import wx from 'weixin-js-sdk'
import Vant from 'vant'
import 'vant/lib/index.css'
import moment from "moment";
moment.locale('zh-cn');
// import vConsole from 'vconsole'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$wx = wx
Vue.prototype.$moment = moment
Vue.use(Vant)
// let Console = new vConsole()
// Vue.use(Console)
new Vue({
  render: h => h(App),
  router,
  data: function () {
    return {
      userId: '' // 获取登录的用户userid
    }
  }
}).$mount('#app')
