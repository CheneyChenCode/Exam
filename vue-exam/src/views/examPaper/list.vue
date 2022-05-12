<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form :inline="true" :model="searchForm" size="medium">
      <el-form-item label="试卷编号">
        <el-input v-model="searchForm.PAPER_ID"></el-input>
      </el-form-item>
      <el-form-item label="试卷名称">
        <el-input v-model="searchForm.PAPER_NAME"></el-input>
      </el-form-item>
      <el-form-item label="试卷类型">
        <el-select v-model="searchForm.PAPER_TYPE" clearable>
          <el-option
            v-for="(value, key) in paperTypeList"
            :label="value"
            :value="key"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抽题类型">
        <el-select v-model="searchForm.PAPER_RULE_TYPE" clearable>
          <el-option
            v-for="(value, key) in paperRuleTypeList"
            :label="value"
            :value="key"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="
            pageNum = 1;
            getExamPaperList();
          "
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="120"></el-table-column>
      <el-table-column prop="PAPER_ID" label="试卷编号"></el-table-column>
      <el-table-column prop="PAPER_NAME" label="试卷名称"></el-table-column>
      <el-table-column label="试卷类型" width="120">
        <template slot-scope="scope">
          {{ paperTypeList[scope.row.PAPER_TYPE] }}
        </template>
      </el-table-column>
      <el-table-column label="抽题类型" width="120">
        <template slot-scope="scope">
          {{ paperRuleTypeList[scope.row.PAPER_RULE_TYPE] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="CREATER"
        label="创建人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="CREATE_TIME"
        label="创建日期"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toDetail(scope.row.PAPER_ID)"
            size="mini"
            >查看</el-button
          >
          <el-button @click="deleteAlert(scope.row.PAPER_ID)" size="mini"
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
  name: "examPaperList",
  data() {
    return {
      searchForm: {},
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      paperTypeList: this.$store.getters.constants.PAPER_TYPE,
      paperRuleTypeList: this.$store.getters.constants.PAPER_RULE_TYPE,
    };
  },
  created() {
    this.getExamPaperList();
  },
  methods: {
    toDetail(PAPER_ID) {
      this.$router.push({
        path: "/examPaper/detail",
        query: { paper_id: PAPER_ID },
      });
    },
    async getExamPaperList() {
      this.searchForm.pageNum = this.pageNum;
      this.searchForm.pageSize = this.pageSize;
      const config = {
        url: "/examPaper/getExamPaperList",
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
      this.getExamPaperList();
    },
    deleteAlert(PAPER_ID) {
      this.$confirm(
        "如果使用该试卷的考试未开始，该考试也会同步删除！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.deleteExamPaper(PAPER_ID);
      });
    },
    async deleteExamPaper(PAPER_ID) {
      const config = {
        url: "/examPaper/deleteExamPaper",
        method: "get",
        data: {
          PAPER_ID: PAPER_ID,
          UPDATER: this.$store.getters.userInfo.user,
        },
      };
      await http(config);
      this.$message.success("删除成功！");
      this.getExamPaperList();
    },
  },
};
</script>
