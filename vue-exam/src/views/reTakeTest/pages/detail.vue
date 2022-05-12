<template>
  <div>
    <navigation></navigation>
    <add-list
      :data="lineData"
      :rolesConfig="rolesConfig"
      :role="currentRole.role"
    >
      <el-form-item label="评委材料上传">
        <span v-download="lineData.file_path" class="current">{{
          lineData.file_path
        }}</span>
      </el-form-item>
    </add-list>
    <cus-el-able :disposition="tableConfig" :daten="tableData">
      <template v-slot:operate="scope">
        <span v-download="scope.file_path" class="current">附件下载</span>
      </template>
      <template v-slot:sop="scope">
        <el-button size="small" @click="searchSop(scope)">课程详情</el-button>
      </template>
      <template v-slot:is_complete="scope">
        <span>{{ scope.is_complete | conversion }}</span>
      </template>
    </cus-el-able>
    <cus-dialog title="SOP详情" :dialogVisible.sync="refundedVisible">
      <div slot="main" class="main-cont">
        <ul class="sop">
          <li v-for="(sop, index) in sopList" :key="index" class="sop-item">
            {{ index + 1 }}.{{ sop.material_name }}
          </li>
        </ul>
      </div>
    </cus-dialog>
  </div>
</template>
<script>
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import cusElDialog from "@/components/cus-ui/cus-dialog/cus-dialog";
import http from "@/https";
import { mapGetters } from "vuex";
import navigation from "@/views/reTake/components/nav.vue";
import addList from "@/views/reTake/components/addList.vue";
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
      role: "",
      tableConfig: [],
      tableData: [], //表格数据
      condition: {},
      rolesConfig: rolesConfig,
      sopList: [],
      refundedVisible: false,
    };
  },
  filters: {
    conversion(val) {
      return val ? (val === "Y" ? "是" : "否") : "";
    },
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.role = val.role;
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
        url: api.TestRecord,
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
     * @description: 查询
     * @param {}
     * @return {}
     */
    searchSop(scope) {
      this.refundedVisible = true;
      this.selectLearningSop(scope);
    },
    /**
     * @description:获取学习SOP列表
     * @param {}
     * @return {}
     */
    async selectLearningSop(scope) {
      const config = {
        method: "get",
        url: api.selectLearningSop,
        data: {
          cram_id: scope.cram_id,
          prisoner: scope.prisoner,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.sopList = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sop {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &-item {
    font-size: 18px;
    line-height: 40px;
    color: #333;
    margin-bottom: 10px;
  }
}
.current {
  cursor: pointer;
}
</style>
