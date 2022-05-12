<template>
  <div id="signCard">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>打卡签到</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <!-- 主体 -->
    <div id="main">
      <!-- 搜索 -->
      <div id="search">
        <el-form label-width="90px">
          <el-row>
            <el-col :span="3">
              <el-form-item label="课程名称" prop="courseName">
                <el-select v-model="courseName" style="width: 100px">
                  <el-option
                    v-for="(item, index) in courseInfoList"
                    :value="item.course_NAME"
                    :label="item.course_NAME"
                    :key="index"
                  >
                    {{ item.course_NAME }}
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
                <el-button type="primary" @click="searchCourse">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="
          courseInfoList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        "
        border
        id="showTable"
      >
        <el-table-column label="No." type="index"></el-table-column>
        <el-table-column prop="course_NAME" label="课程名称"></el-table-column>
        <el-table-column label="课程开始时间">
          <template slot-scope="scope">
            {{ scope.row.START_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="课程结束时间">
          <template slot-scope="scope">
            {{ scope.row.END_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="课程类型">
          <template slot-scope="scope">
            {{ courseType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="course_LOCATION"
          label="上课地点"
          width="180"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="
                showCourseDetail(scope.row.course_ID, scope.row.course_NAME)
              "
              size="normal"
              type="primary"
              >详情</el-button
            >
            <el-button
              @click="
                goToSignCard(
                  scope.row.course_ID,
                  scope.row.course_NAME,
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
  name: "courseSignCard",
  data() {
    return {
      courseInfoList: [], // 课程列表
      pageNum: 1, // 当前页
      pageSize: 10, // 一页显示数量
      total: 0, // 总数
      startRangeTime: [], // 开始时间范围
      endRangeTime: [], // 结束时间范围
      showStartRangTimeError: false, // 开始时间范围不正确时显示
      showEndRangTimeError: false, // 结束时间范围不正确显示
      courseName: "",
    };
  },
  mounted() {
    this.getCourseList();
  },
  methods: {
    // 分页下一页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 显示课程详情
    showCourseDetail(courseId, courseName) {
      // 跳转详情界面
      this.$router.push({
        path: "/examCourse/courseSignCardForDetail",
        query: {
          courseId: courseId,
          courseName: courseName,
        },
      });
    },
    // 前往刷卡界面
    goToSignCard(courseId, courseName, startTime, endTime) {
      this.$router.push({
        path: "/examCourse/courseSignCardForUpdate",
        query: {
          courseId: courseId,
          courseName: courseName,
          startTime: startTime,
          endTime: endTime,
        },
      });
    },
    // 搜索课程
    searchCourse() {
      if (this.startRangeTime.length == 0) {
        this.$message("请选择考试开始时间范围！");
        return;
      }
      if (this.endRangeTime.length == 0) {
        this.$message("请选择考试结束时间范围！");
        return;
      }
      const searchCourseList = {
        url: "/GetTest/searchCourse",
        method: "get",
        data: {
          courseName: this.courseName,
          startRangeTime: this.startRangeTime.join(","),
          endRangeTime: this.endRangeTime.join(","),
        },
      };
      // 搜索
      http(searchCourseList).then((res) => {
        this.courseInfoList = res.data;
        this.total = this.courseInfoList.length;
        this.courseName = "";
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
    getCourseList() {
      const getCourse = {
        url: "/GetTest/getCourseListInNow",
        method: "get",
        data: "",
      };
      http(getCourse).then((res) => {
        this.courseInfoList = res.data;
        this.total = this.courseInfoList.length;
      });
    },
    // 显示课程类型名称
    courseType(type) {
      var s = "";
      if (type == 1) {
        s = "必修";
      } else if (type == 2) {
        s = "选修";
      } else {
        s = "补习";
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
  height: 100%;
  overflow: auto;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 5%;
  z-index: 999;
  text-align: center;
  left: 10%;
}
</style>
