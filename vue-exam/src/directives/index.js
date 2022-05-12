import Vue from "vue";
import backtop from "./backtop";
import failImg from "./errorImg";
import loadImg from "./loadImg";
import has from "./has";
import download from "./download";
const directives = {
  backtop,
  failImg,
  loadImg,
  has,
  download,
};

Object.keys(directives).forEach((name) =>
  Vue.directive(name, directives[name])
);
