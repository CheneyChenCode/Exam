<template>
  <!--  考试中心   -->
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>考试中心</el-breadcrumb-item>
      <el-breadcrumb-item>未考试</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 未考试详情 -->
    <el-table
      :data="noBeginList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column
        prop="testId"
        label="考试编号"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="testName"
        label="考试名称"
        width="250"
      ></el-table-column>
      <el-table-column label="考试开始时间">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="考试结束时间">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.testId != null"
            @click="
              toTestView(
                scope.row.testId,
                scope.row.startTime,
                scope.row.endTime,
                scope.row.testTime,
                scope.row.singleTime,
                scope.row.multipleTime,
                scope.row.judgeTime,
                scope.row.fillingTime
              )
            "
            size="normal"
            type="primary"
            >考试</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 考试须知弹出层 -->
    <el-dialog
      title="考试须知"
      :visible.sync="testInstructionPopup"
      width="45%"
      height="100%"
      padding="10px"
      center
    >
      <div
        style="
          position: relative;
          width: 100%;
          height: 100%;
          border: 0.5px solid gray;
          border-radius: 12px;
        "
      >
        <el-row v-if="testList.testTime == null">
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >1.考试不能返回上一题</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >2.到每种题型考试时间会自动跳转下一题</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >3.单选题:{{ testList.singleTime }} 秒</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >4.多选题:{{ testList.multipleTime }} 秒</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >5.判断题: {{ testList.judgeTime }} 秒</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >5.填空题: {{ testList.fillingTime }} 秒</el-col
          >
        </el-row>
        <el-row v-else>
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >1.考试到时间自动交卷</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              margin: 5px;
              text-align: center;
              font-size: 20px;
            "
            >2.考试时长:{{ testList.testTime }} 分</el-col
          >
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="primary"
              round
              style="position: relative; left: 38%; margin: 20px; width: 120px"
              v-if="instrutionTime > 0"
              >{{ instrutionTime }} 秒</el-button
            >
            <el-button
              type="primary"
              round
              style="position: relative; left: 38%; margin: 20px; width: 120px"
              @click="goToTest"
              v-else
              >确定</el-button
            ></el-col
          >
        </el-row>
      </div>
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
  name: "noBeginTest",
  data() {
    return {
      noBeginList: [], // 未考试列表
      onGoingInsert: {},
      total: 0,
      pageNum: 1,
      pageSize: 10,
      testInstructionPopup: false, // 考试须知弹出层控制
      testList: {
        testId: "",
        singleTime: "",
        multipleTime: "",
        judgeTime: "",
        fillingTime: "",
        testTime: "",
        startTime: "",
        endTime: "",
      },
      instrutionPopupHeight: "", // 考试须知弹出层高度
      instrutionTime: 5, // 倒计时确认查看考试须知
    };
  },
  computed: {
    employ_id() {
      return this.$store.getters.userInfo.employ_id;
    },
  },
  watch: {
    employ_id: {
      handler(newVal) {
        console.log("工号", newVal);
        if (newVal) {
          this.TestForNoBegin();
        }
      },
      deep: true,
      immediate: true,
    },
    testInstructionPopup: {
      handler(newVal) {
        if (newVal == false) {
          clearInterval(this.timer);
        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    // 定时减少查看考试须知时间
    showInstrutionTime() {
      if (this.instrutionTime > 0) {
        this.instrutionTime--;
      } else {
        clearInterval(this.timer);
      }
    },
    // // 获取未考试信息
    TestForNoBegin() {
      const config = {
        url: "/GetTest/TestForNoBeginByEmpID",
        method: "get",
        data: {
          employ_id: this.employ_id,
        },
      };
      http(config).then((item) => {
        this.$message.success("获取成功");
        this.noBeginList = item.data;
        this.total = item.data.length;
        console.log(this.noBeginList);
      });
    },
    // 前往考试界面
    goToTest() {
      // 处理字符串转时间
      const start = new Date(
        Date.parse(this.testList.startTime.replace(/-/g, "/"))
      );
      const end = new Date(
        Date.parse(this.testList.endTime.replace(/-/g, "/"))
      );
      const newDate = new Date();
      // 判断是否需要刷卡
      const needCard = {
        url: "GetTest/getNeedCard",
        method: "get",
        data: {
          testId: this.testList.testId,
        },
      };
      http(needCard).then((res) => {
        // 不需要刷卡，直接根据时间判断是否可以考试
        if (res.data == "N") {
          const onGoingConfig = {
            url: "GetTest/havingOngoingForPc",
            method: "get",
            data: {
              employ_id: this.employ_id,
            },
          };
          // 判断是否有进行中的考试
          http(onGoingConfig).then((res) => {
            if (res.data == 0) {
              if (start < newDate && end > newDate) {
                this.$confirm("确定进行考试？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                }).then(() => {
                  // 将本考试id加入进行中
                  const obj = {
                    testId: this.testList.testId,
                    userId: this.employ_id,
                    testStartTime: this.toTimeFormate(new Date()),
                  };
                  const insertOnGoing = {
                    url: "PostTest/addToOnGoingByEmployId",
                    method: "post",
                    data: obj,
                  };
                  // 插入到进行中考试
                  http(insertOnGoing).then(() => {
                    this.$message.success("获取数据成功");
                    // 跳转考试界面
                    this.$router.push({
                      path: "/testCenter/testView",
                      query: {
                        testId: this.testList.testId,
                        routerPath: this.$route.name,
                      },
                    });
                  });
                });
              } else {
                // 如果当前时间超过正常考试时间
                if (new Date() > end) {
                  this.$message.error("已超时！禁止考试");
                } else {
                  // 当前时间未到
                  this.$message.error("未到考试时间！");
                }
              }
            } else {
              // 有正在考试的内容
              this.$message.error("当前已有正在进行的考试！");
            }
          });
          console.log(1);
        } else {
          // 需要刷卡，判断是否刷卡，已刷卡后才根据时间判断进入考试
          const config = {
            url: "GetTest/getTestFlagByEmployId",
            method: "get",
            data: {
              testId: this.testList.testId,
              employ_id: this.employ_id,
            },
          };
          http(config).then((res) => {
            if (res.data != 1) {
              const onGoingConfig = {
                url: "GetTest/havingOngoingForPc",
                method: "get",
                data: {
                  employ_id: this.employ_id,
                },
              };
              // 判断是否有进行中的考试
              http(onGoingConfig).then((res) => {
                if (res.data == 0) {
                  if (start < newDate && end > newDate) {
                    this.$confirm("确定进行考试？", "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                    }).then(() => {
                      // 将本考试id加入进行中
                      const obj = {
                        testId: this.testList.testId,
                        userId: this.employ_id,
                        testStartTime: this.toTimeFormate(new Date()),
                      };
                      const insertOnGoing = {
                        url: "PostTest/addToOnGoingByEmployId",
                        method: "post",
                        data: obj,
                      };
                      // 插入到进行中考试
                      http(insertOnGoing).then(() => {
                        this.$message.success("获取数据成功");
                        // 跳转考试界面
                        this.$router.push({
                          path: "/testCenter/testView",
                          query: {
                            testId: this.testList.testId,
                            routerPath: this.$route.name,
                          },
                        });
                      });
                    });
                  } else {
                    // 如果当前时间超过正常考试时间
                    if (new Date() > end) {
                      this.$message.error("已超时！禁止考试");
                    } else {
                      // 当前时间未到
                      this.$message.error("未到考试时间！");
                    }
                  }
                } else {
                  // 有正在考试的内容
                  this.$message.error("当前已有正在进行的考试！");
                }
              });
            } else {
              this.$message.error("您未刷卡");
            }
          });
        }
      });
      //
    },
    // 前往考试界面-显示考试须知
    toTestView(
      testId,
      startTime,
      endTime,
      testTime,
      singleTime,
      multipleTime,
      judgeTime,
      fillingTime
    ) {
      this.testList.testId = testId;
      this.testList.testTime = testTime;
      this.testList.singleTime = singleTime;
      this.testList.multipleTime = multipleTime;
      this.testList.judgeTime = judgeTime;
      this.testList.fillingTime = fillingTime;
      this.testList.startTime = startTime;
      this.testList.endTime = endTime;
      this.testInstructionPopup = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.instrutionTime = 5;
      }
      this.timer = setInterval(this.showInstrutionTime, 1000);
      //
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
    handleCurrentChange(page) {
      this.pageNum = page;
    },
  },
};
</script>

<style scoped></style>
