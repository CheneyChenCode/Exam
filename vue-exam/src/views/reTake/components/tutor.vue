<template>
  <div>
    <navigation @click="submitForm">
      <el-button type="warning" size="small" @click="refunded">退回</el-button>
    </navigation>
    <add-list
      :data="lineData"
      :rolesConfig="rolesConfig"
      :role="currentRole.role"
    >
    </add-list>
    <cus-el-able :disposition="tableConfig" :daten="tableData">
      <template v-slot:entry="scope">
        <el-input v-model="scope.prisoner" @change="searchStudent(scope)" />
      </template>
      <template v-slot:reason="scope">
        <el-input v-model="scope.jail_reason" />
      </template>
      <template v-slot:operate="scope">
        <el-button size="mini" type="primary" @click="prickClass(scope)"
          >选择课程</el-button
        >
      </template>
    </cus-el-able>
    <cus-dialog :title="title" :dialogVisible.sync="dialogVisible" :btns="btns">
      <div slot="main" class="main-cont">
        <el-transfer v-model="sops" :data="sopList"></el-transfer>
      </div>
    </cus-dialog>
    <cus-dialog
      title="退回处置"
      :dialogVisible.sync="refundedVisible"
      :btns="RefundedBtns"
    >
      <div slot="main" class="main-cont">
        <span class="main-title">退回原因</span>
        <el-input
          type="textarea"
          :rows="2"
          v-model="rejectReason"
          placeholder="请输入内容"
        >
        </el-input>
      </div>
    </cus-dialog>
  </div>
</template>
<script>
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import cusElDialog from "@/components/cus-ui/cus-dialog/cus-dialog";
import http from "@/https";
import { mapGetters } from "vuex";
import navigation from "../components/nav.vue";
import addList from "../components/addList.vue";
import rolesConfig from "../config";
import api from "@/api";
export default {
  components: {
    "cus-el-able": cusElTable,
    navigation,
    "add-list": addList,
    "cus-dialog": cusElDialog,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
      lineData: "getLineData",
    }),
  },
  data() {
    return {
      tableConfig: [],
      tableData: [], //表格数据
      title: "选择SOP",
      dialogVisible: false,
      refundedVisible: false,
      btns: { ok: this.saveSop, cancle: this.cancleEvent },
      RefundedBtns: { ok: this.tutorReturnToCheck, cancle: this.cancleEvent },
      sopList: [],
      sops: [],
      active: {},
      rejectReason: "",
      rolesConfig: rolesConfig,
    };
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.tableConfig = this.rolesConfig[val.role].tableAddConfig;
        }
      },
      deep: true,
      immediate: true,
    },
    lineData: {
      handler(val) {
        if (Object.keys(val).length) {
          this.getList();
        } else {
          this.$router.go(-1);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    async getList() {
      const config = {
        method: "get",
        url: api.getCourseRecord,
        data: {
          jail_id: this.lineData.jail_id,
          role: this.$store.getters.userInfo.role_id,
          cram_id: this.lineData.cram_id,
          prisoner: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      if (res.code == 1000 && res.data) {
        this.tableData = res.data.map((item) => {
          return { ...item, sop_list: [] };
        });
      }
    },
    /**
     * @description:保存
     * @param {}
     * @return {}
     */
    async saveStudent() {
      const config = {
        method: "post",
        url: this.rolesConfig[this.currentRole.role].saveProt,
        data: {
          cramDetails: {
            creater: this.currentRole.role_id,
          },
          studentsBasicInfo: this.multipleSelection,
        },
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.$message.success("保存成功");

        this.$router.push({
          name: "reTake",
        });
      }
    },

    /**
     * @description:选择课程
     * @param {}
     * @return {}
     */
    prickClass(scope) {
      this.dialogVisible = true;
      this.getSelectSOPList(scope);
      this.active = scope;
    },
    cancleEvent() {
      this.dialogVisible = false;
      this.refundedVisible = false;
    },

    /**
     * @description:获取课程
     * @param {}
     * @return {}
     */
    async getSelectSOPList(scope) {
      this.setActive(scope);
      const config = {
        method: "get",
        url: api.selectSOPList,
        data: {
          prisonser_department: scope.prisonser_department,
          prisonser_job: scope.prisonser_job,
          cram_id: this.lineData.cram_id,
          prisoner: scope.prisoner,
        },
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.sopList = res.data.map((scope) => {
          return {
            label: scope.material_name,
            key: scope.material_id,
          };
        });
      }
    },

    /**
     * @description:数据校验
     * @param {}
     * @return {}
     */
    validate() {
      const result = this.tableData.filter((item) => !item.sop_list.length);
      if (result.length) {
        const ids = result.map((item) => item.id);
        this.$message.error(`第${ids.join(",")}条课程未选择`);
        return false;
      } else {
        return true;
      }
    },

    /**
     * @description:提交
     * @param {}
     * @return {}
     */
    async submitForm() {
      if (!this.validate()) {
        return;
      }
      const param = this.tableData.map((scope) => {
        return {
          prisoner: scope.prisoner,
          material_id: scope?.sop_list?.join(","),
          cram_id: this.lineData.cram_id,
          course_id: this.lineData.course_id,
        };
      });
      const config = {
        method: "post",
        url: api.saveNeedStudySOPList,
        data: param,
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.$message.success("保存成功");

        this.$router.push({
          name: "reTake",
        });
      }
    },

    /**
     * @description:重置
     * @param {}
     * @return {}
     */
    resetBridge() {
      this.sops = [];
      this.active = {};
    },
    /**
     * @description:保存
     * @param {}
     * @return {}
     */
    saveSop() {
      this.dialogVisible = false;
      const index = this.tableData.findIndex((scope) => {
        return scope.id == this.active.id;
      });
      this.tableData[index].sop_list = this.sops || [];
      this.resetBridge();
    },

    /**
     * @description:设置默认
     * @param {}
     * @return {}
     */
    setActive(row) {
      const index = this.tableData.findIndex((scope) => {
        return scope.id == row.id;
      });
      this.sops = this.tableData[index].sop_list;
    },

    /**
     * @description:拒绝
     * @param {}
     * @return {}
     */
    refunded() {
      this.refundedVisible = true;
    },

    /**
     * @description:拒绝提交
     * @param {}
     * @return {}
     */
    async tutorReturnToCheck() {
      if (!this.rejectReason) {
        this.$message.error("请输入拒绝原因");
        return;
      }
      const config = {
        method: "post",
        url: api.tutorReturnToCheck,
        data: {
          cram_id: this.lineData.cram_id,
          jail_id: this.lineData.jail_id,
          reject_reason: this.rejectReason,
        },
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.$message.success("提交成功");

        this.$router.push({
          name: "reTake",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  // &::v-deep .el-transfer-panel {
  //   width: 600px;
  // }
  // &::v-deep .el-transfer-panel__item {
  //   height: auto;
  // }
  // &::v-deep .el-checkbox__label {
  //   white-space: pre-wrap;
  // }
}
.main-title {
  font-size: 20px;
  font-weight: bold;
  padding-right: 20px;
  margin-right: 10px;
  color: #333;
  white-space: nowrap;
  position: relative;
  &::after {
    content: "(*)";
    position: absolute;
    top: 0;
    right: -8px;
    color: red;
    bottom: 0;
    margin: auto;
  }
}
</style>
