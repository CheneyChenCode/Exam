<script>
export default {
  name: "demo-dialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    btns: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    updateDialogVisible(val) {
      this.visibleStatus = val;
    },
    handleClick(val) {
      this.visibleStatus = false;
      const event = this.btns[val];
      typeof event === "function" ? event() : "";
      this.$emit("update:dialogVisible", false);
    },
  },
  data() {
    return {
      visibleStatus: this.dialogVisible,
    };
  },
  watch: {
    dialogVisible(nv) {
      this.visibleStatus = nv;
    },
    visibleStatus(nv) {
      this.$emit("update:dialogVisible", nv);
    },
  },
  render() {
    const buttons = {
      ok: (
        <el-button
          type="primary"
          onClick={() => {
            this.handleClick("ok");
          }}
        >
          确 定
        </el-button>
      ),
      cancle: (
        <el-button
          onClick={() => {
            this.handleClick("cancle");
          }}
        >
          取消
        </el-button>
      ),
    };
    const btns = Object.keys(this.btns).map((btn) => buttons[btn]);
    const footerBtn = (
      <span slot="footer" class="dialog-footer">
        {btns}
      </span>
    );
    const elDialog = (
      <el-dialog
        title={this.title}
        {...{ props: { visible: this.visibleStatus } }}
        {...{ on: { "update:visible": this.updateDialogVisible } }}
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
      >
        {this.$slots.main}
        {footerBtn}
      </el-dialog>
    );
    return elDialog;
  },
};
</script>
