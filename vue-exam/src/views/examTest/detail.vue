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
        <el-breadcrumb-item>考试管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="人员选择" name="2"></el-tab-pane>
    </el-tabs>
    <div v-show="activeName == '1'">
      <el-form ref="submitForm" :model="submitForm" label-width="140px">
        <el-form-item label="考试编号">
          <el-input
            v-model="submitForm.TEST_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input
            v-model="submitForm.TEST_NAME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-input
            v-model="submitForm.START_TIME"
            style="width: 200px"
            disabled
          ></el-input
          >~
          <el-input
            v-model="submitForm.END_TIME"
            style="width: 200px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="选择试卷">
          {{ submitForm.PAPER_NAME }}
        </el-form-item>
        <el-form-item label="补考次数限制">
          <el-input
            v-model="submitForm.RETEST_COUNT_LIMIT"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="limitTimePerQuestion" disabled
            >是否限制每题型作答时间</el-checkbox
          >
        </el-form-item>
        <el-form-item v-if="!limitTimePerQuestion" label="考试作答时间(分)">
          <el-input
            v-model="submitForm.TEST_TIME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-row v-if="limitTimePerQuestion">
          <el-col :span="5">
            <el-form-item label="单选题时间限制(秒)">
              <el-input
                v-model="submitForm.TEST_TIME_S_CHOICE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="多选题时间限制(秒)">
              <el-input
                v-model="submitForm.TEST_TIME_M_CHOICE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="填空题时间限制(秒)">
              <el-input
                v-model="submitForm.TEST_TIME_CLOZE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="判断题时间限制(秒)">
              <el-input
                v-model="submitForm.TEST_TIME_JUDGE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-checkbox v-model="NEED_CARD" disabled>是否需要刷卡</el-checkbox>
        </el-form-item>
        <el-form-item v-if="NEED_CARD" label="刷卡位置">
          <el-input
            v-model="submitForm.TEST_LOCATION"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeName == '2'">
      <el-table :data="examTesteeList" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column label="工号" prop="TESTEE"></el-table-column>
        <el-table-column label="姓名" prop="TESTEE_NAME"></el-table-column>
        <el-table-column label="部门" prop="DEPARTMENT"></el-table-column>
        <el-table-column label="区域" prop="AREA"></el-table-column>
        <el-table-column label="职位" prop="JOB"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from "@/https";
export default {
  data() {
    return {
      test_id: null,
      activeName: "1",
      submitForm: {},
      examTesteeList: [],
      limitTimePerQuestion: false,
      NEED_CARD: false,
    };
  },
  created() {
    this.test_id = this.$route.query.test_id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const config = {
        url: "/examTest/getExamTestDetail",
        method: "get",
        data: {
          TEST_ID: this.test_id,
        },
      };
      const res = await http(config);
      this.submitForm = res.data;
      this.examTesteeList = this.submitForm.examTesteeLists;
      if (this.submitForm.TEST_TIME) {
        this.limitTimePerQuestion = false;
      } else {
        this.limitTimePerQuestion = true;
      }
      this.NEED_CARD = this.submitForm.NEED_CARD == "Y";
    },
    goBack() {
      this.$router.push({ path: "/examTest/list" });
    },
  },
};
</script>
