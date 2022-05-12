<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        style="margin-right: 15px"
        @click="goBack"
        >返回</el-button
      >
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="题库选择" name="2"></el-tab-pane>
    </el-tabs>
    <div v-show="activeName == '1'">
      <el-form ref="submitForm" :model="submitForm" label-width="100px">
        <el-form-item label="试卷编号">
          <el-input
            v-model="submitForm.PAPER_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷名称">
          <el-input
            v-model="submitForm.PAPER_NAME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-radio-group v-model="submitForm.PAPER_TYPE" disabled>
            <el-radio
              v-for="(value, key) in paperTypeList"
              :label="key"
              :key="key"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽题类型">
          <el-radio-group v-model="submitForm.PAPER_RULE_TYPE" disabled>
            <el-radio
              v-for="(value, key) in paperRuleTypeList"
              :label="key"
              :key="key"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽题规则">
          <el-input
            v-model="submitForm.RULE_COMMENT"
            style="width: 350px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷总分">
          <el-input
            v-model="submitForm.TOTAL_SCORE"
            style="width: 250px"
            disabled
          ></el-input>
          <span style="margin-left: 10px; color: #606266"
            >如果无总分则按照题目配分加总，有总分则每题按照总分分配</span
          >
        </el-form-item>
        <el-form-item label="及格线">
          <el-input
            v-model="submitForm.PASSING_GRADE"
            style="width: 250px"
            disabled
          ></el-input>
          <span style="margin-left: 10px; color: #606266"
            >固定分数或试卷总分百分比，例如：60或60%</span
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeName == '2'">
      <el-table :data="questBankList" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column
          label="题库名称"
          prop="QUEST_BANK_ID"
        ></el-table-column>
        <el-table-column
          label="题库版本"
          prop="QUEST_BANK_VERSION"
          width="300"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from "@/https";
export default {
  data() {
    return {
      paper_id: null,
      activeName: "1",
      submitForm: {},
      questBankList: [],
      paperTypeList: this.$store.getters.constants.PAPER_TYPE,
      paperRuleTypeList: this.$store.getters.constants.PAPER_RULE_TYPE,
    };
  },
  created() {
    this.paper_id = this.$route.query.paper_id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const config = {
        url: "/examPaper/getExamPaperDetail",
        method: "get",
        data: {
          PAPER_ID: this.paper_id,
        },
      };
      const res = await http(config);
      this.submitForm = res.data;
      this.submitForm.PAPER_RULE_TYPE = this.submitForm.PAPER_RULE_TYPE + "";
      this.questBankList = this.submitForm.examQuestionBankList;
    },
    goBack() {
      this.$router.push({ path: "/examPaper/list" });
    },
  },
};
</script>
