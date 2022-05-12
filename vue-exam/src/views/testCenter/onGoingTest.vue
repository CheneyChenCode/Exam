<template>
  <div>
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>考试中心</el-breadcrumb-item>
        <el-breadcrumb-item>进行中</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div
      v-if="onGoingTestList.length == 0"
      style="position: relative; left: 50%"
    >
      当前没有进行中的考试
    </div>
    <div v-else>
      <div class="cardCenter">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix cardCenter"
            body-style="padding: 20px"
          >
            <span style="text-align: center; right: 50%">进行中</span>
          </div>
          <el-form
            label-width="120px"
            :v-model="onGoingTestList"
            class="item text onGoingForm"
          >
            <el-form-item label="考试开考时间:">
              <el-row>{{ onGoingTestList[0].startTime }}</el-row>
            </el-form-item>
            <el-form-item label="考试结束时间:">
              <el-row>{{ onGoingTestList[0].endTime }}</el-row>
            </el-form-item>
            <el-form-item label="及格分:">
              <el-row>{{ onGoingTestList[0].passingGrade }} 分</el-row>
            </el-form-item>
            <el-form-item label="是否可补考:">
              <el-row>可补考</el-row>
            </el-form-item>
            <el-form-item label="终端支持:">
              <el-row>PC端</el-row>
            </el-form-item>
            <el-form-item label="已答/总题数:">
              <el-row
                >{{ onGoingTestList[0].haveAnswered }} /
                {{ onGoingTestList[0].countQuest }}</el-row
              >
            </el-form-item>
            <el-form-item label="考试名称:">
              <el-row>{{ onGoingTestList[0].testName }}</el-row>
            </el-form-item>
          </el-form>
        </el-card>
        <el-divider></el-divider>
        <div class="exam_btn">
          <el-button type="primary" round @click="goToTestView"
            >继续考试</el-button
          >
          <el-button type="danger" round @click="gotoFinishTest"
            >结束考试</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/https";
export default {
  name: "onGoingTest",
  data() {
    return {
      onGoingTestList: [], // 接收正在考试的数据
      totalQuestCount: 0, // 当前考试题目总数
      endTime: "",
      testId: "", // 考试id
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
        if (newVal) {
          this.TestForOnGoing();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    TestForOnGoing() {
      const config = {
        url: "/GetTest/TestForOnGoingByEmployId",
        method: "get",
        data: {
          employ_id: this.employ_id,
        },
      };

      http(config).then((item) => {
        this.$message.success("获取成功");
        this.onGoingTestList = item.data;
      });
    },
    // 继续考试
    goToTestView() {
      this.endTime = new Date(
        Date.parse(this.onGoingTestList[0].endTime.replace(/-/g, "/"))
      );
      // 判断是否超时
      if (this.endTime < new Date()) {
        this.$confirm("已超过考试结束时间，是否结束考试", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then(() => {
          this.gotoFinishTest();
        });
      } else {
        const obj = {
          userId: this.employ_id,
          testId: this.onGoingTestList[0].testId,
          testStartTime: this.onGoingTestList[0].startTime,
        };
        const addToOnGoing = {
          url: "PostTest/addToOnGoingByEmployId",
          method: "post",
          data: obj,
        };
        http(addToOnGoing).then(() => {
          this.$router.push({
            path: "/testCenter/testView",
            query: {
              testId: this.onGoingTestList[0].testId,
              testStartTime: this.toTimeFormate(new Date()),
              routerPath: this.$route.name,
            },
          });
        });
      }
    },
    // 结束考试
    gotoFinishTest() {
      // 未全部答案
      this.$confirm("确定结束考试？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        console.log(this.employ_id);
        // 通过userId和testId获取考试暂存题目答案结束考试,并清除正在进行考试的标记
        const obj = {
          userId: this.employ_id,
          testId: this.onGoingTestList[0].testId,
        };
        const OnGoingFinishTest = {
          url: "/PostTest/OnGoingFinishTestByEmpId",
          method: "post",
          data: obj,
        };
        http(OnGoingFinishTest);
        this.$router.push({
          path: "/testCenter/noBeginTest",
        });
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
};
</script>
<style scoped>
.cardCenter {
  position: relative;
  text-align: center;
}
.cardBodyCenter {
  position: relative;
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.cardCenter >>> .el-card__body {
  background-color: antiquewhite;
}
.exam_btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.countinueTest {
  position: relative;
  right: 150px;
  top: 20px;
}
.finishTest {
  position: relative;
  left: 150px;
  bottom: 20px;
}
</style>
