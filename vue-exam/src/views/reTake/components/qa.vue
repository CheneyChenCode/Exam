<template>
  <div>
    <navigation @click="rejectSave"></navigation>
    <add-list
      :role="currentRole.role"
      v-model="condition"
      :data="listData"
      :rolesConfig="rolesConfig"
    >
    </add-list>
    <cus-el-able
      :disposition="tableConfig"
      :daten="tableData"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:entry="scope">
        <span v-if="!scope.editor">{{ scope.prisoner }}</span>
        <el-input
          v-else
          v-model="scope.prisoner"
          @change="searchStudent(scope)"
        />
      </template>
      <template v-slot:reason="scope">
        <span v-if="!scope.editor">{{ scope.jail_reason }}</span>
        <el-input v-else v-model="scope.jail_reason" />
      </template>
      <template v-slot:operate="scope">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="add(scope)"
        ></el-button>
        <el-button
          size="mini"
          icon="el-icon-minus"
          @click="remove(scope)"
        ></el-button>
      </template>
    </cus-el-able>
  </div>
</template>
<script>
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import http from "@/https";
import { mapGetters } from "vuex";
import navigation from "../components/nav.vue";
import addList from "../components/addList.vue";
import rolesConfig from "../config";
import api from "@/api";
import tools from "@/tools";
import { teacherMenu } from "../components/nav.config.js";
export default {
  components: {
    "cus-el-able": cusElTable,
    navigation,
    "add-list": addList,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
      lineData: "getLineData",
    }),
    listData() {
      return Object.keys(this.lineData).reduce((cur, prev) => {
        if (prev === "tutor") {
          cur[prev] = teacherMenu.find(
            (item) => item.label === this.lineData[prev]
          )?.value;
        } else {
          cur[prev] = this.lineData[prev];
        }
        return cur;
      }, {});
    },
  },
  data() {
    return {
      tableConfig: [],
      tableData: [], //表格数据
      condition: {},
      multipleSelection: [], //选中项
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
        this.tableData = res.data;
      }
    },
    /**
     * @description:新增
     * @param {}
     * @return {}
     */
    setTableData(reason) {
      const item = this.tableConfig.reduce((pre, cur) => {
        cur.prop ? (pre[cur.prop] = "") : "";
        return pre;
      }, {});
      item.id = this.tableData.length + 1;
      item.jail_reason = reason;
      item.editor = true;
      console.log(item);
      this.tableData = [...this.tableData, item];
    },
    /**
     * @description:新增
     * @param {}
     * @return {}
     */
    add() {
      if (this.tableData.length >= 20) {
        this.$message.warning("最多只能添加20条数据");
        return;
      }
      const lastItem = this.tableData[this.tableData.length - 1];
      this.setTableData(lastItem.jail_reason);
    },
    /**
     * @description:查询学生信息
     * @param {}
     * @return {}
     */
    async searchStudent(val) {
      const config = {
        method: "get",
        url: api.getStudentInfo,
        data: {
          prisoner: val.prisoner,
        },
      };
      const res = await http(config);
      if (res.code == 1000 && res.data) {
        this.tableData = this.tableData.map((item) => {
          if (item.id === val.id) {
            return tools.assignObject(item, res.data);
          } else {
            return item;
          }
        });
      }
    },
    /**
     * @description:删除
     * @param {}
     * @return {}
     */
    async remove(val) {
      if (this.tableData.length === 1) {
        this.$message.warning("至少保留一条数据");
        return;
      }
      const index = this.tableData.findIndex((item) => item === val);
      this.tableData.splice(index, 1);
      const config = {
        method: "post",
        url: api.deleteAudit,
        data: {
          jail_id: val.jail_id,
          prisoner: val.prisoner,
          cram_id: val.cram_id,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.$message.success("删除成功");
        //this.getList();
      }
    },

    /**
     * @description:日期校验
     * @param {}
     * @return {}
     */
    validTimeChange() {
      if (
        new Date(this.condition.start_time) > new Date(this.condition.end_time)
      ) {
        this.$message.error("开始时间不能大于结束时间");
        return false;
      } else {
        return true;
      }
    },

    /**
     * @description:校验数据
     * @param {}
     * @return {}
     */
    validData() {
      const result = Object.entries(this.condition).filter(([key, val]) => {
        const verify =
          this.rolesConfig[this.currentRole.role]?.addList[key]?.verify;
        if (verify && !verify.test(val)) {
          return true;
        }
      });
      if (result && result.length) {
        const messages = result.map(([key]) => {
          const title =
            this.rolesConfig[this.currentRole.role]?.addList[key]?.title;
          return title;
        });
        this.$message.error(`${messages.join(",")}格式不正确`);
        return false;
      } else {
        return true;
      }
    },

    /**
     * @description:拒绝保存
     * @param {}
     * @return {}
     */
    rejectSave() {
      const port = this.lineData.reject_reason
        ? api.checkSubmitAgain
        : this.rolesConfig[this.currentRole.role].saveProt;
      this.saveStudent(port);
    },
    /**
     * @description:保存
     * @param {}
     * @return {}
     */
    async saveStudent(port) {
      if (!this.validTimeChange()) return;
      if (!this.validData()) return;
      if (this.multipleSelection.length === 0) {
        this.$message.error("请选择学生");
        return;
      }
      const config = {
        method: "post",
        url: port,
        data: {
          cramDetails: {
            ...this.condition,
            creater: this.$store.getters.userInfo.employ_id,
            jail_id: this.lineData.jail_id,
            updater: this.$store.getters.userInfo.employ_id,
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
     * @description:选择
     * @param {}
     * @return {}
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
