<template>
  <main class="cus-home_main">
    <div class="home-view">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import tools from "@/tools";
import http from "@/https";
export default {
  components: {},
  created() {
    //const path = this.$store.getters.menu[0].MenuIndex;
    //if (!window.location.href.includes(path))
    //  this.$router.push({ path: `/${path}` });
  },
  data: function () {
    return {
      token: "",
      user: "",
    };
  },
  mounted() {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == "94a08da1fecbb6e8b46990538c7b50b2") {
        this.token = pair[1];
      }
      if (pair[0] == "ee11cbb19052e40b07aac0ca060c23ee") {
        this.user = pair[1];
      }
    }

    if (!this.token || !this.user) {
      window.location.replace(process.env.VUE_APP_LOGIN_URL);
    }

    localStorage.setItem(tools.TOKEN_KEY, this.token);
    this.getUser();
  },
  methods: {
    setRoute() {
      this.$bus.$on("change", (nv) => {
        const routerPath = nv[nv.length - 1];
        const reg = new RegExp(`\b${routerPath}\b`, "g");
        if (!reg.test(window.location.href))
          this.$router.push({ path: `/${routerPath}` });
      });
      this.$once("hook:beforeDestroy", () => {
        this.$bus.off("change");
      });
    },
    async getUser() {
      const config = {
        url: "/cdp/cdp/user/getUserAuthorities",
        method: "get",
        data: {
          user: this.user,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.$store.commit("setUserInfo", res.data);
        this.$store.commit("setCurrentRole", res.data.role_id);
        this.setRoute();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cus-home_main {
  background-color: #e6e6e6;
  width: calc(100% - 208px);
  padding: 10px 10px 5px 10px;
  box-sizing: border-box;
  .home-view {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
