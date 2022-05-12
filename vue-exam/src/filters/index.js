import Vue from "vue";
import addPorts from "./addPorts";
const filters = {
  addPorts,
};
Object.keys(filters).forEach((name) => Vue.filter(name, filters[name]));
