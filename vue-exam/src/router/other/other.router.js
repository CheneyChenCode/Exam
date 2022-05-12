const routes = [
  {
    path: "/about",
    name: "About",
    components: {
      default: () => import("@/views/About.vue"),
    },
    props: {
      default: (route) => ({ query: route.query.q }),
    },
  },
];
export default routes;
