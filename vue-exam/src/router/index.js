import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "./config";

Vue.use(VueRouter);

for (const key in routerConfig) {
  if (Object.prototype.hasOwnProperty.call(routerConfig, key)) {
    const config = routerConfig[key];
    const module = config.module;
    module.keys().forEach((key) => {
      const routes = module(key).default;
      if (Reflect.has(config, "routes")) {
        config.routes.push(...routes);
      } else {
        Reflect.set(config, "routes", [...routes]);
      }
    });
  }
}

const routes = [
  ...routerConfig.default.routes,
  ...routerConfig.other.routes,
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.NODE_ENV,
  routes,
});

export default router;
