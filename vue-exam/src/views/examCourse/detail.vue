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
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="人员选择" name="2"></el-tab-pane>
      <el-tab-pane label="教材选择" name="3"></el-tab-pane>
      <el-tab-pane
        label="考试"
        name="4"
        v-if="submitForm.TEST_ID"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="activeName == '1'">
      <el-form ref="submitForm" :model="submitForm" label-width="100px">
        <el-form-item label="课程编号">
          <el-input
            v-model="submitForm.COURSE_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input
            v-model="submitForm.COURSE_NAME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课程期限">
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
        <el-form-item label="课程简介">
          <el-input
            type="textarea"
            :rows="3"
            v-model="submitForm.COURSE_BRIEF"
            style="width: 300px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="submitForm.NEED_CARD == 'Y'" disabled
            >是否刷卡才可观看</el-checkbox
          >
        </el-form-item>
        <el-form-item label="刷卡位置" v-if="submitForm.NEED_CARD == 'Y'">
          <el-input
            v-model="submitForm.COURSE_LOCATION"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeName == '2'">
      <el-table :data="examCourseStudentLists" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column label="工号" prop="STUDENT"></el-table-column>
        <el-table-column label="姓名" prop="NAME"></el-table-column>
        <el-table-column label="部门" prop="DEPARTMENT"></el-table-column>
        <el-table-column label="区域" prop="AREA"></el-table-column>
        <el-table-column label="职位" prop="JOB"></el-table-column>
      </el-table>
    </div>
    <div v-show="activeName == '3'">
      <el-table :data="examCourseMaterials" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column label="教材编号" prop="MATERIAL_ID"></el-table-column>
        <el-table-column
          label="教材名称"
          prop="MATERIAL_NAME"
        ></el-table-column>
        <el-table-column
          label="教材版本"
          prop="MATERIAL_VERSION"
        ></el-table-column>
      </el-table>
    </div>
    <div v-show="activeName == '4'">
      <el-form ref="submitFormTest" :model="submitFormTest" label-width="140px">
        <el-form-item label="考试编号">
          <el-input
            v-model="submitFormTest.TEST_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input
            v-model="submitFormTest.TEST_NAME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-input
            v-model="submitFormTest.START_TIME"
            style="width: 200px"
            disabled
          ></el-input
          >~
          <el-input
            v-model="submitFormTest.END_TIME"
            style="width: 200px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="选择试卷">
          {{ submitFormTest.PAPER_NAME }}
        </el-form-item>
        <el-form-item label="补考次数限制">
          <el-input
            v-model="submitFormTest.RETEST_COUNT_LIMIT"
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
            v-model="submitFormTest.TEST_TIME"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-row v-if="limitTimePerQuestion">
          <el-col :span="5">
            <el-form-item label="单选题时间限制(秒)">
              <el-input
                v-model="submitFormTest.TEST_TIME_S_CHOICE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="多选题时间限制(秒)">
              <el-input
                v-model="submitFormTest.TEST_TIME_M_CHOICE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="填空题时间限制(秒)">
              <el-input
                v-model="submitFormTest.TEST_TIME_CLOZE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="判断题时间限制(秒)">
              <el-input
                v-model="submitFormTest.TEST_TIME_JUDGE"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-checkbox :value="submitFormTest.NEED_CARD == 'Y'" disabled
            >是否需要刷卡</el-checkbox
          >
        </el-form-item>
        <el-form-item v-if="submitFormTest.NEED_CARD == 'Y'" label="刷卡位置">
          <el-input
            v-model="submitFormTest.TEST_LOCATION"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import http from "@/https";
export default {
  data() {
    return {
      course_id: null,
      activeName: "1",
      submitForm: {},
      examCourseStudentLists: [],
      examCourseMaterials: [],
      submitFormTest: {},
      limitTimePerQuestion: false,
    };
  },
  created() {
    this.course_id = this.$route.query.course_id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const config = {
        url: "/examCourse/getExamCourseDetail",
        method: "get",
        data: {
          COURSE_ID: this.course_id,
        },
      };
      const res = await http(config);
      this.submitForm = res.data;
      this.examCourseStudentLists = this.submitForm.examCourseStudentLists;
      this.examCourseMaterials = this.submitForm.examCourseMaterials;
      if (this.submitForm.exam_test) {
        this.submitFormTest = this.submitForm.exam_test;
        if (this.submitFormTest.TEST_TIME) {
          this.limitTimePerQuestion = false;
        } else {
          this.limitTimePerQuestion = true;
        }
      }
    },
    goBack() {
      this.$router.push({ path: "/examCourse/list" });
    },
  },
};
</script>
