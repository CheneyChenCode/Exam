<script>
import { modelChangeMixin } from "./../mixin";
export default {
  name: "cus-pagination",
  mixins: [modelChangeMixin],
  props: {
    pages: {
      type: Object,
      default: () => ({}),
    },
  },
  inheritAttrs: false,
  data() {
    return {
      page: this.pages,
    };
  },
  methods: {
    handleCurrentChange(value) {
      this.page.current = value;
      this.$emit("change", this.page);
    },
    handleSizeChange(value) {
      this.page.size = value;
      this.$emit("change", this.page);
    },
  },
  render() {
    const pageSizes = [10, 20];
    const pagination = (
      <el-pagination
        class="pagination"
        background
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        layout="total, sizes, prev, pager, next, jumper"
        current-page={this.page.current}
        onCurrent-change={this.handleCurrentChange}
        onSize-change={this.handleSizeChange}
        page-size={this.page.size}
        page-sizes={pageSizes}
        total={this.page.total}
      />
    );
    return pagination;
  },
};
</script>
<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
>
