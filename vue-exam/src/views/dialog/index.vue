<template>
  <div>
    visiableStatus:{{ visiableStatus }}
    <cus-dialog :title="title" :dialogVisible.sync="dialogVisible" :btns="btns">
      <span slot="main">主要内容</span>
    </cus-dialog>
    <el-button @click="secHandleEvent">提交</el-button>
  </div>
</template>
<script>
export default {
  components: {
    "cus-dialog": () => import("@/components/cus-ui/cus-dialog/cus-dialog"),
  },
  data() {
    return {
      title: "提示",
      dialogVisible: false,
      visiableStatus: "",
      btns: { ok: this.submitForm, cancle: this.cancleEvent },
    };
  },
  methods: {
    submitForm() {
      console.log("提交表单");
    },
    cancleEvent() {
      console.log("取消提交");
    },
    secHandleEvent() {
      this.dialogVisible = true;
    },
  },
};
</script>
