<template>
  <div id="signCard">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>考试管理</el-breadcrumb-item>
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
                label="考试名称"
                prop="courseName"
                style="border: 0.5px solid gray; border-radius: 12px"
              >
                {{ $route.query.testName }}
              </el-form-item>
            </el-col>
            <el-col :span="16"> </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="
          testStudentList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        "
        border
        style="width: 100%; text-align-center; position: relative"
      >
        <el-table-column label="No." type="index" width="120"></el-table-column>
        <el-table-column prop="TESTEE" label="学员工号"></el-table-column>
        <el-table-column label="学员姓名">
          <template slot-scope="scope">
            {{ scope.row.TESTEE_NAME }}
          </template>
        </el-table-column>
        <el-table-column label="学员部门">
          <template slot-scope="scope">
            {{ scope.row.DEPARTMENT }}
          </template>
        </el-table-column>
        <el-table-column label="学员岗位">
          <template slot-scope="scope">
            {{ scope.row.JOB }}
          </template>
        </el-table-column>
        <el-table-column label="刷卡状态">
          <template slot-scope="scope">
            {{ signCardStatus(scope.row.CARD_ID) }}
          </template>
        </el-table-column>
        <el-table-column label="卡号">
          <template slot-scope="scope">
            {{ scope.row.CARD_ID }}
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
  name: "testSignCardForDetail",
  data() {
    return {
      testStudentList: [], // 考试学员列表
      pageNum: 1, // 当前页
      pageSize: 10, // 一页显示数量
      total: 0, // 总数
    };
  },
  mounted() {
    this.getTestStudent();
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.push({ path: "/examTest/testSignCard" });
    },
    // 分页下一页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 刷卡状态
    signCardStatus(card) {
      var s = "";
      if (card == null || card == "") {
        s = "未刷卡";
      } else {
        s = "已刷卡";
      }
      return s;
    },
    // 获取课程学员列表
    getTestStudent() {
      const getTestStudent = {
        url: "/GetTest/getTestPersonById",
        method: "get",
        data: {
          testId: this.$route.query.testId,
        },
      };
      http(getTestStudent).then((res) => {
        this.testStudentList = res.data;
        this.total = this.testStudentList.length;
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
