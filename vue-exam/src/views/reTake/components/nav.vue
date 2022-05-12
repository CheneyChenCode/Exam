<template>
  <div class="navitation">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>质量补习班</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in title" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button @click="add" v-has="'add'" type="primary" size="small"
        >新增</el-button
      >

      <el-button v-on="$listeners" v-has="'submit'" type="primary" size="small">
        提交</el-button
      >
      <slot></slot>
      <el-button @click="cancel" v-has="'cancel'" size="small">返回</el-button>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { menu } from "./nav.config";
export default {
  name: "navigation",
  data() {
    return {
      title: [],
      path: this.$route.path.split("/"),
      modelName: this.$route.query.modelName,
    };
  },
  mounted() {
    this.setTitle();
  },
  methods: {
    /**
     * @description:setTitle
     * @param {}
     * @return {}
     */
    setTitle() {
      if (!this.modelName) {
        this.path.forEach((item) => this.pathTitle(menu, item));
      } else {
        this.title = ["质量补习班课程", this.modelName];
      }
    },
    /**
     * @description: 获取路由title
     * @param {}
     * @return {}
     */
    pathTitle(tree, path) {
      return tree.forEach((node) => {
        if (node.MenuIndex === path) {
          this.title.push(node.title);
        } else if (node.children && node.children.length) {
          this.pathTitle(node.children, path);
        }
      });
    },
    /**
     * @description:取消
     * @param {}
     * @return {}
     */
    cancel() {
      this.$router.go(-1);
    },

    /**
     * @description:新增
     * @param {}
     * @return {}
     */
    add() {
      const role = {
        add: false,
        cancel: true,
        submit: true,
      };
      this.$store.commit("changeRole", role);
      this.$router.push({
        path: "/reTake/add",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.navitation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
