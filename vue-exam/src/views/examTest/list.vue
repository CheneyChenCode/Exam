<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form :inline="true" :model="searchForm" size="medium">
      <el-form-item label="考试编号">
        <el-input v-model="searchForm.TEST_ID"></el-input>
      </el-form-item>
      <el-form-item label="考试名称">
        <el-input v-model="searchForm.TEST_NAME"></el-input>
      </el-form-item>
      <el-form-item label="试卷编号">
        <el-input v-model="searchForm.PAPER_ID"></el-input>
      </el-form-item>
      <el-form-item label="前一次考试编号">
        <el-input v-model="searchForm.PRE_TEST_ID"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="searchForm.CREATER"></el-input>
      </el-form-item>
      <el-form-item label="考试类型">
        <el-select v-model="searchForm.TEST_TYPE" clearable>
          <el-option
            v-for="(value, key) in testTypeList"
            :label="value"
            :value="key"
            :key="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试状态">
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange"
          style="margin-right: 30px"
          >全部</el-checkbox
        >
        <el-checkbox-group
          v-model="checkTestStates"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="(value, key) in testStateList"
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
            getExamTestList();
          "
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="120"></el-table-column>
      <el-table-column
        prop="TEST_ID"
        label="考试编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="TEST_NAME"
        label="考试名称"
        width="300"
      ></el-table-column>
      <el-table-column label="考试类型" width="150">
        <template slot-scope="scope">
          {{ testTypeList[scope.row.TEST_TYPE] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="PAPER_ID"
        label="试卷编号"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="PRE_TEST_ID"
        label="前一次考试编号"
        width="180"
      ></el-table-column>
      <el-table-column label="有效时间" width="350">
        <template slot-scope="scope">
          {{ scope.row.START_TIME }}~{{ scope.row.END_TIME }}
        </template>
      </el-table-column>
      <el-table-column
        prop="CREATER"
        label="创建人"
        width="120"
      ></el-table-column>
      <el-table-column label="考试状态" width="120">
        <template slot-scope="scope">
          {{ testStateList[scope.row.testState] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toDetail(scope.row.TEST_ID)"
            size="mini"
            >查看</el-button
          >
          <el-button
            @click="deleteAlert(scope.row.TEST_ID, scope.row.TEST_NAME)"
            size="mini"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.TEST_TYPE == 1"
            type="success"
            @click="addNextExamTest(scope.row)"
            size="mini"
            >补考</el-button
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
  name: "examTestList",
  data() {
    return {
      searchForm: {},
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      testStateList: this.$store.getters.constants.TEST_STATE,
      testTypeList: this.$store.getters.constants.TEST_TYPE,
      checkAll: false,
      checkTestStates: [],
    };
  },
  created() {
    this.getExamTestList();
  },
  methods: {
    toDetail(TEST_ID) {
      this.$router.push({
        path: "/examTest/detail",
        query: { test_id: TEST_ID },
      });
    },
    async getExamTestList() {
      this.searchForm.pageNum = this.pageNum;
      this.searchForm.pageSize = this.pageSize;
      this.searchForm.testStates = this.checkTestStates.join(",");
      const config = {
        url: "/examTest/getExamTestList",
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
      this.getExamTestList();
    },
    handleCheckAllChange(val) {
      this.checkTestStates = val ? ["0", "1", "2"] : [];
    },
    deleteAlert(TEST_ID, TEST_NAME) {
      this.$confirm("将删除考试：" + TEST_NAME + "，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteExamTest(TEST_ID);
      });
    },
    async deleteExamTest(TEST_ID) {
      const config = {
        url: "/examTest/deleteExamTest",
        method: "get",
        data: {
          TEST_ID: TEST_ID,
          UPDATER: this.$store.getters.userInfo.user,
        },
      };
      await http(config);
      this.$message.success("删除成功！");
      this.getExamTestList();
    },
    async addNextExamTest(row) {
      const config = {
        url: "/examTest/addNextExamTestAdmin",
        method: "get",
        data: {
          TEST_ID: row.TEST_ID,
        },
      };
      await http(config);
      this.$router.push({
        path: "/examTest/add",
        query: {
          test_id: row.TEST_ID,
        },
      });
    },
  },
};
</script>
