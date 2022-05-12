import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/Function";
import "./utils/Array";
import "./utils/String";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/directives";
import global from "@/components/global";
import moment from "moment";
moment.locale("zh-cn");

Vue.use(ElementUI);
Vue.use(global);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
