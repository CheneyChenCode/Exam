<template>
  <div>
    <navigation @click="saveStudent" :role="role"></navigation>
    <add-list
      :role="role"
      v-model="condition"
      :rolesConfig="rolesConfig"
    ></add-list>
    <cus-el-able :disposition="tableConfig" :daten="tableData">
      <template v-slot:entry="scope">
        <el-input v-model="scope.prisoner" @change="searchStudent(scope)" />
      </template>
      <template v-slot:reason="scope">
        <el-input v-model="scope.jail_reason" />
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
          v-if="scope.id !== 1"
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
export default {
  components: {
    "cus-el-able": cusElTable,
    navigation,
    "add-list": addList,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
    }),
  },
  data() {
    return {
      role: "",
      tableConfig: [],
      tableData: [], //表格数据
      condition: {},
      rolesConfig: rolesConfig,
    };
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.role = val.role;
          this.tableConfig = this.rolesConfig[val.role].tableAddConfig;
          this.setTableData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /**
     * @description:新增
     * @param {}
     * @return {}
     */
    setTableData(reason) {
      const item = this.tableConfig.reduce((pre, cur) => {
        pre[cur.prop] = "";
        return pre;
      }, {});
      item.id = this.tableData.length + 1;
      item.jail_reason = reason;
      this.tableData = [...this.tableData, item];
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
     * @description:删除
     * @param {}
     * @return {}
     */
    remove(val) {
      const index = this.tableData.findIndex((item) => item.id === val.id);
      this.tableData.splice(index, 1);
    },

    /**
     * @description:工号校验
     * @param {}
     * @return {}
     */
    validData() {
      const reasonIdsArr = this.tableData.filter((item) => !item.jail_reason);
      const prisonerIdsArr = this.tableData.filter((item) => !item.prisoner);
      const message = [];
      if (!reasonIdsArr.length && !prisonerIdsArr.length) {
        return true;
      }
      reasonIdsArr.forEach((item) => {
        message.push(`No为${item.id}行未填写加入补习班原因`);
      });
      prisonerIdsArr.forEach((item) => {
        message.push(`No为${item.id}行未填写学员工号`);
      });
      this.$message.warning(message.join("\n"));
      return false;
    },

    /**
     * @description:原因校验
     * @param {}
     * @return {}
     */
    validReason() {
      if (!tools.checkJsonEmpty(this.condition)) {
        this.$message.warning("请填写加入补习班原因");
        return false;
      } else {
        return true;
      }
    },
    /**
     * @description:保存
     * @param {}
     * @return {}
     */
    async saveStudent() {
      console.log(this.condition);
      if (!this.validReason()) return;
      if (!this.validData()) return;
      const subData = this.tableData.map((item) => {
        return Object.assign(item, this.condition, {
          creater: this.$store.getters.userInfo.employ_id,
          ...this.condition,
        });
      });
      const config = {
        method: "post",
        url: this.rolesConfig[this.currentRole.role].saveProt,
        data: subData,
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.$message.success("保存成功");

        this.$router.push({
          name: "reTake",
        });
      }
    },
  },
};
</script>
