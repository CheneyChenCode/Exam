<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form :inline="true" :model="searchForm" size="medium">
      <el-form-item label="课程编号">
        <el-input v-model="searchForm.COURSE_ID"></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="searchForm.COURSE_NAME"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="searchForm.CREATER"></el-input>
      </el-form-item>
      <el-form-item label="是否刷卡才可观看">
        <el-select v-model="searchForm.NEED_CARD">
          <el-option value="Y" label="是"></el-option>
          <el-option value="N" label="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange"
          style="margin-right: 30px"
          >全部</el-checkbox
        >
        <el-checkbox-group
          v-model="checkCourseStates"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="(value, key) in courseStateList"
            :label="key"
            :key="key"
            >{{ value }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="
            pageNum = 1;
            getExamCourseList();
          "
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="120"></el-table-column>
      <el-table-column
        prop="COURSE_ID"
        label="课程编号"
        width="180"
      ></el-table-column>
      <el-table-column prop="COURSE_NAME" label="课程名称"></el-table-column>
      <el-table-column
        prop="START_TIME"
        label="开始时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="END_TIME"
        label="结束时间"
        width="180"
      ></el-table-column>
      <el-table-column label="是否刷卡才可观看" width="150">
        <template slot-scope="scope">{{
          scope.row.NEED_CARD == "Y" ? "是" : "否"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="CREATER"
        label="创建人"
        width="120"
      ></el-table-column>
      <el-table-column label="课程状态" width="120">
        <template slot-scope="scope">
          {{ courseStateList[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toDetail(scope.row.COURSE_ID)"
            size="mini"
            >查看</el-button
          >
          <el-button
            @click="deleteAlert(scope.row.COURSE_ID, scope.row.COURSE_NAME)"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  name: "examCourseList",
  data() {
    return {
      searchForm: {},
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      courseStateList: this.$store.getters.constants.COURSE_STATE,
      checkAll: false,
      checkCourseStates: [],
    };
  },
  created() {
    this.getExamCourseList();
  },
  methods: {
    toDetail(COURSE_ID) {
      this.$router.push({
        path: "/examCourse/detail",
        query: { course_id: COURSE_ID },
      });
    },
    async getExamCourseList() {
      this.searchForm.pageNum = this.pageNum;
      this.searchForm.pageSize = this.pageSize;
      this.searchForm.states = this.checkCourseStates.join(",");
      const config = {
        url: "/examCourse/getExamCourseList",
        method: "get",
        data: this.searchForm,
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.getExamCourseList();
    },
    handleCheckAllChange(val) {
      this.checkCourseStates = val ? ["0", "1", "2"] : [];
    },
    deleteAlert(COURSE_ID, COURSE_NAME) {
      this.$confirm("将删除课程：" + COURSE_NAME + "，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteExamCourse(COURSE_ID);
      });
    },
    async deleteExamCourse(COURSE_ID) {
      const config = {
        url: "/examCourse/deleteExamCourse",
        method: "get",
        data: {
          COURSE_ID: COURSE_ID,
          UPDATER: this.$store.getters.userInfo.user,
        },
      };
      await http(config);
      this.$message.success("删除成功！");
      this.getExamCourseList();
    },
  },
};
</script>
