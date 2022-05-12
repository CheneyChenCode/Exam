<template>
  <!--  考试中心   -->
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>考试中心</el-breadcrumb-item>
      <el-breadcrumb-item>已考试</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 已考试详情 -->
    <el-table
      :data="isOverTestList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="testId" label="考试编号"></el-table-column>
      <el-table-column prop="testName" label="考试名称"></el-table-column>
      <el-table-column label="实际考试时间">
        <template slot-scope="scope">
          {{ scope.row.testStartTime.slice(0, 19) }}~{{
            scope.row.submitTime.slice(0, 19)
          }}
        </template>
      </el-table-column>
      <el-table-column label="考试结果"
        ><template slot-scope="scope">
          <span v-if="scope.row.testScore >= scope.row.passingGrade">及格</span
          ><span v-else>不及格</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="
              showDetail(
                scope.row.testName,
                scope.row.testScore,
                scope.row.passingGrade,
                scope.row.testStartTime,
                scope.row.submitTime,
                scope.row.testId
              )
            "
            size="normal"
            type="primary"
            >详情</el-button
          >
          <el-button
            v-if="scope.row.testScore < scope.row.passingGrade"
            @click="resit(scope.row.testId)"
            size="normal"
            slot="reference"
            type="danger"
            >补考</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog
      :title="showTest.Name"
      :visible.sync="centerDialogVisible"
      width="50%"
      height="40%"
      center
    >
      <el-form label-width="120px" :model="showTest" class="isOverPopup">
        <div>
          <el-form-item label="实际开始时间:">
            <el-row>{{ showTest.testStartTime.slice(0, 19) }}</el-row>
          </el-form-item>
          <el-form-item label="实际结束时间:">
            <el-row>{{ showTest.submitTime.slice(0, 19) }}</el-row>
          </el-form-item>
          <el-form-item label="考试得分:">
            <el-row>{{ showTest.Score }} 分</el-row>
          </el-form-item>
          <el-form-item label="及格分:">
            <el-row>{{ showTest.passingGrade }}</el-row>
          </el-form-item>
          <el-form-item>
            <el-row
              ><el-button type="primary" @click="goToResult(showTest.testId)"
                >考试结果</el-button
              ></el-row
            >
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
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
import http from "@/https";
export default {
  name: "isOverTest",
  data() {
    return {
      isOverTestList: [], // 已考试列表
      total: 0,
      pageNum: 1, // 当前页
      pageSize: 10,
      centerDialogVisible: false, // 弹出层控制
      showTest: {
        Name: "",
        Score: "",
        passingGrade: "",
        testStartTime: "",
        submitTime: "",
        testId: "",
      },
    };
  },
  computed: {
    employ_id() {
      return this.$store.getters.userInfo.employ_id;
    },
  },
  created() {},
  methods: {
    goToResult(testId) {
      this.$router.push({
        path: "/testCenter/testResult",
        query: {
          testId: testId,
        },
      });
    },
    getIsOverTestList() {
      const isOverTest = {
        url: "/GetTest/TestForIsOverByEmployId",
        method: "get",
        data: {
          employ_id: this.employ_id,
        },
      };
      http(isOverTest).then((res) => {
        console.log(res);
        this.isOverTestList = res.data;
        this.total = res.data.length;
      });
    },
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 显示详情
    showDetail(Name, Score, passingGrade, testStartTime, submitTime, testId) {
      this.showTest.Name = Name;
      this.showTest.Score = Score;
      this.showTest.passingGrade = passingGrade;
      this.showTest.testStartTime = testStartTime;
      this.showTest.submitTime = submitTime;
      this.showTest.testId = testId;
      this.centerDialogVisible = true;
    },
    // 补考接口
    addNextExamTestPersonal(testId) {
      const addNextExamTestPersonal = {
        url: "/examTest/getExamTestQuestListByEmpId",
        method: "get",
        data: {
          testId: testId,
          employ_id: this.$store.getters.userInfo.employ_id,
        },
      };
      http(addNextExamTestPersonal).then(() => {
        const havingOnging = {
          url: "/GetTest/havingOngoingForPc",
          method: "get",
          data: {
            employ_id: this.$store.getters.userInfo.employ_id,
          },
        };
        http(havingOnging).then((res) => {
          if (res.data == 0) {
            const obj = {
              userId: this.$store.getters.userInfo.employ_id,
              testId: testId,
              testStartTime: this.toTimeFormate(new Date()),
            };
            const addToOnGoing = {
              url: "/PostTest/addToOnGoingByEmployId",
              method: "post",
              data: obj,
            };
            http(addToOnGoing).then(() => {
              // 跳转到考试
              this.$router.push({
                path: "/testCenter/testView",
                query: {
                  testId: testId,
                  testStartTime: this.toTimeFormate(new Date()),
                  routerPath: this.$route.name,
                },
              });
            });
          } else {
            this.$message.success("当前已有进行中的考试");
          }
        });
      });
    },
    resit(testId) {
      console.log(testId);
      this.$confirm("确定进行补考？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.addNextExamTestPersonal(testId);
      });
    },
    // 格式化时间
    toTimeFormate(date) {
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 - 0 >= 10
          ? Number(date.getMonth()) + 1
          : "0" + (Number(date.getMonth()) + 1);
      let D = date.getDate();
      let h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      let m =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    },
  },
  watch: {
    employ_id: {
      handler(newVal) {
        if (newVal) {
          this.getIsOverTestList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
#isOver {
  position: relative;
  height: 100%;
  width: 100%;
}
.isOverPopup {
  position: relative;
  left: 35%;
  width: 70%;
}
</style>
