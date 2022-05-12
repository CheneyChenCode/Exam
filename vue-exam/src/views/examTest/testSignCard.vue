<template>
  <div id="signCard">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>考试管理</el-breadcrumb-item>
        <el-breadcrumb-item>打卡签到</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <!-- 主体 -->
    <div id="main">
      <!-- 搜索 -->
      <div id="search">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="4">
              <el-form-item label="考试名称" prop="testName">
                <el-select v-model="testName" style="width: 100px">
                  <el-option
                    v-for="(item, index) in testInfoList"
                    :value="item.test_NAME"
                    :label="item.test_NAME"
                    :key="index"
                  >
                    {{ item.test_NAME }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" required>
                <el-date-picker
                  v-model="startRangeTime"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="startRangeTimeChange"
                  size="mini"
                ></el-date-picker>
                <div class="el-form-item__error" v-if="showStartRangTimeError">
                  请选择正确的时间
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="结束时间" required>
                <el-date-picker
                  v-model="endRangeTime"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="endRangeTimeChange"
                  size="mini"
                ></el-date-picker>
                <div class="el-form-item__error" v-if="showEndRangTimeError">
                  请选择正确的时间
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="primary" @click="searchTest">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="testInfoList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        border
        id="showTable"
      >
        <el-table-column label="No." type="index"></el-table-column>
        <el-table-column prop="test_NAME" label="考试名称"></el-table-column>
        <el-table-column label="考试开始时间">
          <template slot-scope="scope">
            {{ scope.row.START_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="考试结束时间">
          <template slot-scope="scope">
            {{ scope.row.END_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="考试类别">
          <template slot-scope="scope">
            {{ testType(scope.row.pre_TEST_ID) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="test_LOCATION"
          label="考试地点"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="showTestDetail(scope.row.test_ID, scope.row.test_NAME)"
              size="normal"
              type="primary"
              >详情</el-button
            >
            <el-button
              @click="
                goToSignCard(
                  scope.row.test_ID,
                  scope.row.test_NAME,
                  scope.row.START_TIME,
                  scope.row.END_TIME
                )
              "
              size="normal"
              type="primary"
              >刷卡</el-button
            >
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
      id="footer"
    >
    </el-pagination>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import http from "@/https";
export default {
  name: "testSignCard",
  data() {
    return {
      testInfoList: [], // 课程列表
      pageNum: 1, // 当前页
      pageSize: 10, // 一页显示数量
      total: 0, // 总数
      startRangeTime: [], // 开始时间范围
      endRangeTime: [], // 结束时间范围
      showStartRangTimeError: false, // 开始时间范围不正确时显示
      showEndRangTimeError: false, // 结束时间范围不正确显示
      testName: "",
    };
  },
  mounted() {
    this.getTestList();
  },
  methods: {
    // 分页下一页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 显示课程详情
    showTestDetail(testId, testName) {
      // 跳转详情界面
      this.$router.push({
        path: "/examTest/testSignCardForDetail",
        query: {
          testId: testId,
          testName: testName,
        },
      });
    },
    // 前往刷卡界面
    goToSignCard(testId, testName, startTime, endTime) {
      this.$router.push({
        path: "/examTest/testSignCardForUpdate",
        query: {
          testId: testId,
          testName: testName,
          startTime: startTime,
          endTime: endTime,
        },
      });
    },
    // 搜索课程
    searchTest() {
      if (this.startRangeTime.length == 0) {
        this.$message("请选择考试开始时间范围！");
        return;
      }
      if (this.endRangeTime.length == 0) {
        this.$message("请选择考试结束时间范围！");
        return;
      }
      const searchTestList = {
        url: "/GetTest/searchTest",
        method: "get",
        data: {
          testName: this.testName,
          startRangeTime: this.startRangeTime.join(","),
          endRangeTime: this.endRangeTime.join(","),
        },
      };
      // 搜索
      http(searchTestList).then((res) => {
        this.testInfoList = res.data;
        this.total = this.testInfoList.length;
        this.testName = "";
      });
    },
    // 范围时间不正确，显示错误文本-开始时间
    startRangeTimeChange() {
      this.showStartRangTimeError =
        !this.startRangeTime || this.startRangeTime.length == 0 ? true : false;
    },
    // 范围时间不正确，显示错误文本-结束时间
    endRangeTimeChange() {
      this.showEndRangTimeError =
        !this.endRangeTime || this.endRangeTime.length == 0 ? true : false;
    },
    // 获取课程列表
    getTestList() {
      const getTestList = {
        url: "/GetTest/getTestListInNow",
        method: "get",
        data: "",
      };
      http(getTestList).then((res) => {
        this.testInfoList = res.data;
        this.total = this.testInfoList.length;
      });
    },
    // 显示课程类型名称
    testType(value) {
      var s = "";
      if (value == null) {
        s = "考试";
      } else {
        s = "补考";
      }
      return s;
    },
  },
};
</script>
<style scoped>
.signCard {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main {
  position: relative;
  height: 100%;
  width: 100%;
}
.showTable {
  position: relative;
  width: 100%;
  height: calc(100% -40%);
  overflow: auto;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0%;
  right: 25%;
  text-align: center;
}
</style>
