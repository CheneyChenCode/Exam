<template>
  <aside
    class="cus-home_left"
    :style="{ width: isCollapse ? '65px' : '208px' }"
    :class="{ 'cus-transition': !isCollapse }"
  >
    <cus-menu :treeData="menuTree" class="cus-menu-main" v-model="path" />
  </aside>
</template>

<script>
const cusMenu = () => import("@/components/cusMenu");
import { mapGetters } from "vuex";
export default {
  components: {
    "cus-menu": cusMenu,
  },
  computed: {
    ...mapGetters({
      menuList: "menu",
      setUserInfo: "userInfo",
    }),
  },
  data() {
    return {
      isCollapse: false,
      path: [],
      menuTree: [],
      roleId: "",
    };
  },
  watch: {
    path(nv) {
      if (Array.isArray(nv) && nv.length > 0) {
        this.$bus.$emit("change", nv);
      }
    },
    setUserInfo: {
      handler(nv) {
        if (Object.keys(nv).length > 0) {
          this.roleId = nv.role_id;
          this.menuTree = this.filterTree(this.menuList, this.fc);
          console.log(this.menuTree);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    traggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getIntersection(str, source) {
      const strArray = str.split(",");
      const sourceArray = source.split(",");
      const result = sourceArray.find((el) => strArray.includes(el));
      return result;
    },
    fc(item) {
      return Reflect.has(item, "accessRights")
        ? this.getIntersection(item.accessRights, this.roleId)
        : true;
    },
    filterTree(tree, fc) {
      if (!Array.isArray(tree) || tree.length === 0) {
        return [];
      }
      return tree.filter((item) => {
        item.children =
          (item.children && this.filterTree(item.children, fc)) || [];
        return fc(item);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cus-home_left {
  width: 208px;
  height: calc(100vh - 53px);
}
.cus-menu-main {
  height: calc(100% - 49px);
}
.cus-menu-traggle {
  border-top: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 48px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}
.cus-transition {
  transition: all 0.3s ease-in-out 300ms;
}
</style>
