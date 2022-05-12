<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("change", keyPath);
    },
  },
  render() {
    const recursionMenu = (arr) =>
      arr.map((item) => {
        if (Reflect.has(item, "children") && item.children.length > 0) {
          return (
            <el-submenu index={item.MenuIndex}>
              <template slot="title">{item.title}</template>
              {recursionMenu(item.children)}
            </el-submenu>
          );
        } else {
          return (
            <el-menu-item index={item.MenuIndex}>{item.title}</el-menu-item>
          );
        }
      });
    const activeIndex = this.treeData[0]?.MenuIndex;
    const elMenu = (
      <el-menu onSelect={this.handleSelect} default-active={activeIndex}>
        {recursionMenu(this.treeData)}
      </el-menu>
    );
    return elMenu;
  },
};
</script>

<style lang="scss" scoped></style>
