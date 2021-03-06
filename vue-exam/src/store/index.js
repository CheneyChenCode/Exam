import Vue from "vue";
import Vuex from "vuex";
import menu from "./menu";
import userInfo from "./user";
import constants from "./constants";
import reTake from "./reTake";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    userInfo,
    constants,
    reTake,
  },
});
