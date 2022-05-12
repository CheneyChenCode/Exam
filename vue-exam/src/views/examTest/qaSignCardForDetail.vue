<template>
  <div id="signCard">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>质量补习班</el-breadcrumb-item>
        <el-breadcrumb-item>打卡签到</el-breadcrumb-item>
        <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        size="mini"
        style="margin-right: 15px"
        @click="goBack"
        >返回</el-button
      >
    </div>
    <el-divider></el-divider>
    <!-- 主体 -->
    <div id="main">
      <!-- 详情 -->
      <div id="search">
        <el-form label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="补习班主题"
                prop="cramName"
                style="border: 0.5px solid gray; border-radius: 12px"
              >
                {{ $route.query.cramName }}
              </el-form-item>
            </el-col>
            <el-col :span="16"> </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="
          qaStudentList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        "
        border
        style="width: 100%; text-align-center; position: relative"
      >
        <el-table-column label="No." type="index"></el-table-column>
        <el-table-column prop="prisoner" label="学员工号"></el-table-column>
        <el-table-column label="学员姓名" width="180">
          <template slot-scope="scope">
            {{ scope.row.prisoner_NAME }}
          </template>
        </el-table-column>
        <el-table-column label="进度">
          <template slot-scope="scope">
            {{ prisonerStatus(scope.row.prisoner_STATUS) }}
          </template>
        </el-table-column>
        <el-table-column label="结业状态">
          <template slot-scope="scope">
            {{ cramComplete(scope.row.is_COMPLETE) }}
          </template>
        </el-table-column>
        <el-table-column label="刷卡状态">
          <template slot-scope="scope">
            {{ signCardStatus(scope.row.card_ID) }}
          </template>
        </el-table-column>
        <el-table-column label="卡号">
          <template slot-scope="scope">
            {{ scope.row.card_ID }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      style="text-align: center"
    >
    </el-pagination>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import http from "@/https";
export default {
  name: "qaSignCardForDetail",
  data() {
    return {
      qaStudentList: [], // 考试学员列表
      pageNum: 1, // 当前页
      pageSize: 10, // 一页显示数量
      total: 0, // 总数
    };
  },
  mounted() {
    this.getQaStudent();
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.push({ path: "/examTest/qaSignCard" });
    },
    // 分页下一页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 刷卡状态
    signCardStatus(card) {
      var s = "";
      if (card == null) {
        s = "未刷卡";
      } else {
        s = "已刷卡";
      }
      return s;
    },
    // 结业状态
    cramComplete(value) {
      var s = "";
      if (value == "Y") {
        s = "是";
      } else {
        s = "否";
      }
      return s;
    },
    // 人员进度
    prisonerStatus(value) {
      var s = "";
      if (value == "1") {
        s = "SOP学习考试中";
      } else if (value == "2") {
        s = "结业考试中";
      } else {
        s = "答辩通过";
      }
      return s;
    },
    // 获取课程学员列表
    getQaStudent() {
      const getQaStudent = {
        url: "/GetTest/getQaPersonList",
        method: "get",
        data: {
          cramId: this.$route.query.cramId,
        },
      };
      http(getQaStudent).then((res) => {
        this.qaStudentList = res.data;
        console.log(res);
        this.total = this.qaStudentList.length;
      });
    },
  },
};
</script>
<style scoped>
.signCard {
  position: relative;
  height: 80%;
  width: 100%;
}
.main {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
