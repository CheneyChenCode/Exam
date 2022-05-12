<template>
  <div id="signCardForUpdate">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>考试管理</el-breadcrumb-item>
        <el-breadcrumb-item>打卡签到</el-breadcrumb-item>
        <el-breadcrumb-item>刷卡界面</el-breadcrumb-item>
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
      <!-- 刷卡 -->
      <div id="search">
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="考试名称"
                style="border: 0.5px solid gray; border-radius: 12px"
              >
                {{ $route.query.testName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="开始时间"
                style="border: 0.5px solid gray; border-radius: 12px"
              >
                {{ $route.query.startTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="结束时间"
                style="border: 0.5px solid gray; border-radius: 12px"
              >
                {{ $route.query.endTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <!-- 刷卡 -->
          <el-col :span="8">
            <el-input
              type="text"
              id="getFocus"
              v-model="cardInputValue"
              @change="updateCardInfo"
              style="width: 50%"
            ></el-input>
          </el-col>
          <el-col :span="16">
            <span v-if="showMessage.length != 0">
              <span
                v-if="showMessage.code == 200"
                style="
                  position: relative;
                  text-align: center;
                  top: 10px;
                  left: 20px;
                  color: blue;
                "
                >{{ showMessage.message }}</span
              >
              <span
                v-else
                style="
                  position: relative;
                  text-align: center;
                  top: 10px;
                  left: 20px;
                  color: red;
                "
                >{{ showMessage.message }}</span
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="
          testStudentList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        "
        border
        style="width: 100%; text-align-center; position: relative; top: 1px"
      >
        <el-table-column label="No." type="index"></el-table-column>
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
  name: "testSignCardForUpdate",
  data() {
    return {
      testStudentList: [], // 课程学员列表
      pageNum: 1, // 当前页
      pageSize: 10, // 一页显示数量
      total: 0, // 总数
      cardInputValue: "", // 刷卡获取的值
      showMessage: [], // 返回刷卡后的信息
    };
  },
  created() {
    this.getTestStudent();
  },
  mounted() {
    document.getElementById("getFocus").focus();
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
    // 更新卡号
    updateCardInfo() {
      if (this.cardInputValue != null) {
        const updateTestCardInfo = {
          url: "GetTest/updateTestCardInfo",
          method: "get",
          data: {
            testId: this.$route.query.testId,
            cardId: this.cardInputValue,
          },
        };
        http(updateTestCardInfo)
          .then((res) => {
            this.showMessage = res.data;
          })
          .then(() => {
            this.cardInputValue = "";
          })
          .then(() => {
            this.getTestStudent();
          });
      }
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
