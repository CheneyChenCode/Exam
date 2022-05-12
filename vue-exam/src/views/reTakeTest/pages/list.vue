<template>
  <div class="wrapper">
    <navigation></navigation>
    <inquires
      @click="search"
      v-model="condition"
      :role="currentRole.role"
      :rolesConfig="rolesConfig"
    ></inquires>
    <cus-el-able :disposition="tableConfig" :daten="tableData">
      <template v-slot:cram_status="scope">
        {{ scope.cram_status | cramStatus }}
      </template>
      <template v-slot:operate="scope">
        <el-button
          size="mini"
          type="primary"
          v-if="checkBtn(scope)"
          @click="disposal(scope)"
          >处置</el-button
        >
        <el-button size="mini" @click="detail(scope)">详情</el-button>
      </template>
    </cus-el-able>
    <div class="page">
      <cus-pagination :pages="pages" v-model="pages" />
    </div>
  </div>
</template>
<script>
import inquires from "@/views/reTake/components/inquires.vue";
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import cusPagination from "@/components/cus-ui/cus-pagination/cus-pagination";
import { mapGetters } from "vuex";
import api from "@/api";
import http from "@/https";
import rolesConfig from "../config";
import navigation from "@/views/reTake/components/nav.vue";
export default {
  components: {
    inquires,
    "cus-el-able": cusElTable,
    "cus-pagination": cusPagination,
    navigation,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
    }),
  },
  data() {
    return {
      tableConfig: [],
      pages: {
        size: 10, //每页数据条数，非必须
        total: 0, // 总数据条数，必须
        current: 1, // 当前页数，必须
      },
      condition: {}, //查询条件
      tableData: [], //表格数据
      rolesConfig: rolesConfig,
    };
  },
  filters: {
    cramStatus(val) {
      const crams = {
        1: "稽查组",
        2: "班主任",
        3: "学员",
        4: "答辩中",
        5: "结业",
      };
      return crams[val];
    },
  },
  beforeMount() {
    if (this.currentRole.role) {
      this.tableConfig =
        this.rolesConfig[this.currentRole.role].tableListConfig;
      this.hrGetRecord();
    }
    this.setRole();
  },
  watch: {
    "currentRole.role"(nv) {
      if (nv) {
        this.tableConfig = this.rolesConfig[nv].tableListConfig;
        this.hrGetRecord();
      }
    },
    "pages.size"() {
      this.hrGetRecord();
    },
    "pages.current"() {
      this.hrGetRecord();
    },
  },
  methods: {
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    async hrGetRecord() {
      const config = {
        method: "get",
        url: api.selectTestRecordList,
        data: {
          ...this.condition,
          role: this.$store.getters.userInfo.role_id,
          pageSize: this.pages.size,
          currentPage: this.pages.current,
          prisoner: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      if (res.code == 1000 && res.data.datas) {
        this.pages.total = res.data.recordCount;
        this.pages.current = res.data.currentPage;
        this.pages.size = res.data.pageSize;
        console.log(this.pages);
        this.tableData = res.data.datas;
      } else {
        this.$message.warning(res.data);
      }
    },

    /**
     * @description:重置分页
     * @param {}
     * @return {}
     */
    resetPage() {
      this.pages.current = 1;
      this.pages.size = 10;
      this.pages.total = 0;
    },
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    search() {
      this.resetPage();
      this.hrGetRecord();
    },
    /**
     * @description: 处置
     * @param {}
     * @return {}
     */
    disposal(scope) {
      const role = {
        add: false,
        cancel: true,
        submit: scope.cram_status !== "3" ? true : false,
      };
      this.$store.commit("changeRole", role);
      this.$store.commit("setLineData", scope);
      this.$router.push({
        path: "/reTakeTest/disposal",
        query: {
          modelName: "处置",
        },
      });
    },
    /**
     * @description: 详情
     * @param {}
     * @return {}
     */
    detail(scope) {
      const role = {
        add: false,
        cancel: true,
        submit: false,
      };
      this.$store.commit("changeRole", role);
      this.$store.commit("setLineData", scope);
      this.$router.push({
        path: "/reTakeTest/detail",
      });
    },

    /**
     * @description:设置权限
     * @param {}
     * @return {}
     */
    setRole() {
      const role = {
        add: false,
        cancel: false,
        submit: false,
      };
      this.$store.commit("changeRole", role);
    },
    /**
     * @description:处置按钮判断
     * @param {}
     * @return {}
     */
    checkBtn(scope) {
      const role = this.$store.state.reTake.roles;
      const roleList = role.includes("tutor") && scope.cram_status === "4";
      return roleList;
    },
  },
};
</script>
