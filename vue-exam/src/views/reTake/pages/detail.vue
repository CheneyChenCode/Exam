<template>
  <div>
    <div class="navitation">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>质量补习班</el-breadcrumb-item>
        <el-breadcrumb-item> 质量补习班课程 </el-breadcrumb-item>
        <el-breadcrumb-item> 课程详情 </el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button @click="cancel" size="small">返回</el-button>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="inquires">
      <div class="inquires-item" v-for="(item, index) in addList" :key="index">
        <span class="inquires-item--title">{{ item.title }}</span>
        <p class="inquires-item--text">{{ lineData[item.key] }}</p>
      </div>
    </div>
    <cus-el-table :disposition="tableConfig" :daten="tableData">
      <template v-slot:operate="scope">
        <el-button size="mini" @click="searchSop(scope)">课程详情</el-button>
      </template>
    </cus-el-table>
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
import { mapGetters } from "vuex";
import api from "@/api";
import http from "@/https";
import cusElDialog from "@/components/cus-ui/cus-dialog/cus-dialog";
export default {
  components: {
    "cus-el-table": cusElTable,
    "cus-dialog": cusElDialog,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
      lineData: "getLineData",
    }),
  },
  watch: {
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
  data() {
    return {
      tableConfig: [
        { prop: "id", label: "No" },
        { prop: "prisoner", label: "工号" },
        { prop: "prisonser_name", label: "姓名" },
        { prop: "prisonser_department", label: "部门" },
        { prop: "prisonser_job", label: "职位" },
        { prop: "jail_reason", label: "加入补习班原因" },
        { prop: "studentsProgression", label: "学员学习进度" },
        { prop: "operate", label: "操作", slot: "operate" },
      ],
      tableData: [],
      sopList: [],
      refundedVisible: false,
      addList: {
        cram_id: {
          key: "cram_id",
          title: "上课期别:",
          type: "text",
        },
        start_time: {
          key: "start_time",
          title: "上课开始时间:",
          type: "text",
        },
        end_time: {
          key: "end_time",
          title: "上课截止时间:",
          type: "text",
        },
        cram_name: {
          key: "cram_name",
          title: "补习班主题:",
          type: "text",
        },
        cram_location: {
          key: "cram_location",
          title: "上课地点:",
          type: "text",
        },
        tutor: {
          key: "tutor",
          title: "班主任:",
          type: "text",
        },
      },
    };
  },
  methods: {
    /**
     * @description:取消
     * @param {}
     * @return {}
     */
    cancel() {
      this.$router.go(-1);
    },
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
          cram_id: this.lineData.cram_id,
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
.navitation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.inquires {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .inquires-item--last {
    margin-left: auto;
  }
  .inquires-item {
    display: flex;
    flex-direction: row;
    line-height: 40px;
  }
  .inquires-item--title {
    width: 120px;
  }
  .inquires-item--text {
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
    width: 217px;
  }
}
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
</style>
