<template>
  <div id="examCourseAdd">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-steps
      :active="currentStep"
      finish-status="success"
      simple
      style="margin-bottom: 20px"
    >
      <el-step title="1.填写基本信息"></el-step>
      <el-step title="2.选择人员"></el-step>
      <el-step title="3.选择教材"></el-step>
      <el-step title="4.创建考试"></el-step>
      <el-step title="5.创建成功"></el-step>
    </el-steps>
    <div v-show="currentStep == 0">
      <el-form
        ref="submitForm"
        :model="submitForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="课程编号" required>
          <el-input
            v-model="submitForm.COURSE_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="COURSE_NAME">
          <el-input
            v-model.trim="submitForm.COURSE_NAME"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程期限" required>
          <el-date-picker
            v-model="validTimeArray"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="validTimeChange"
          ></el-date-picker>
          <div class="el-form-item__error" v-if="showValidTimeError">
            请选择课程期限
          </div>
        </el-form-item>
        <el-form-item label="课程简介" prop="COURSE_BRIEF">
          <el-input
            type="textarea"
            :rows="3"
            v-model="submitForm.COURSE_BRIEF"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="NEED_CARD">是否刷卡才可观看</el-checkbox>
        </el-form-item>
        <el-form-item v-if="NEED_CARD" label="刷卡位置" prop="COURSE_LOCATION">
          <el-select v-model="submitForm.COURSE_LOCATION">
            <el-option
              v-for="i in locations"
              :value="i"
              :label="i"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="validForm">下一步</el-button>
      </el-form>
    </div>
    <div v-show="currentStep == 1" class="tree-box">
      <div class="tree-search">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="departmentFilterText"
          style="width: 250px"
        ></el-input>
        <el-tree
          ref="departmentTree"
          :data="departmentList"
          :props="departmentProps"
          @node-click="departmentClick"
          :filter-node-method="filterDepartment"
          highlight-current
          :default-expand-all="true"
          :expand-on-click-node="false"
          style="display: inline-block; overflow-y: auto; height: 600px"
        ></el-tree>
      </div>
      <div>
        <el-transfer
          v-model="checkStudentIds"
          :data="employeeInfoList"
          :titles="['待选列表', '已选列表']"
          :button-texts="['移除', '选择']"
          :props="{ key: 'STUDENT', label: 'NAME' }"
          target-order="push"
          @change="checkStudentChange"
          filterable
          filter-placeholder="请输入工号/姓名"
          :filter-method="employeeInfoFilter"
          style="display: inline-block"
        >
          <span slot-scope="{ option }">
            {{ option.JOB ? option.JOB + " / " : "" }} {{ option.NAME }}（{{
              option.STUDENT
            }}）
          </span>
        </el-transfer>
        <div style="margin-top: 20px; text-align: center">
          <el-button @click="currentStep--">上一步</el-button>
          <el-button type="primary" @click="validStudent">下一步</el-button>
        </div>
      </div>
    </div>
    <div v-show="currentStep == 2" class="tree-box">
      <div class="tree-search">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="examMaterialGroupsFilterText"
          style="width: 250px"
        ></el-input>
        <el-tree
          ref="examMaterialGroupsTree"
          :data="examMaterialGroups"
          :props="examMaterialGroupsProps"
          @node-click="materialGroupsClick"
          :filter-node-method="filterMaterialGroups"
          highlight-current
          :default-expand-all="true"
          :expand-on-click-node="false"
          style="display: inline-block; overflow-y: auto; height: 600px"
        ></el-tree>
      </div>
      <div>
        <el-transfer
          v-model="checkMaterialIds"
          :data="examMaterialList"
          :titles="['待选列表', '已选列表']"
          :button-texts="['移除', '选择']"
          :props="{ key: 'ID', label: 'MATERIAL_NAME' }"
          target-order="push"
          @change="checkMaterialChange"
          filterable
          filter-placeholder="请输入教材名称/编号"
          :filter-method="materialFilter"
          style="display: inline-block"
        >
          <span slot-scope="{ option }">
            {{ option.MATERIAL_NAME }}（{{ option.MATERIAL_ID }}）
          </span>
        </el-transfer>
        <div style="margin-top: 20px; text-align: center">
          <el-button @click="currentStep--">上一步</el-button>
          <el-button @click="validMaterial">下一步</el-button>
          <el-button type="primary" @click="addSubmit1">提交</el-button>
        </div>
      </div>
    </div>
    <div v-show="currentStep == 3">
      <el-form
        ref="submitFormTest"
        :model="submitFormTest"
        :rules="testRules"
        label-width="150px"
      >
        <el-form-item label="考试编号" required>
          <el-input
            v-model="submitFormTest.TEST_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="考试名称" prop="TEST_NAME">
          <el-input
            v-model.trim="submitFormTest.TEST_NAME"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-date-picker
            v-model="validTimeArrayTest"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="validTimeChangeTest"
          ></el-date-picker>
          <div class="el-form-item__error" v-if="showValidTimeErrorTest">
            请选择有效时间
          </div>
        </el-form-item>
        <el-form-item label="选择试卷" required>
          {{ PAPER_NAME }}
          <el-button type="text" @click="openSelectPaper">选择试卷</el-button>
          <div class="el-form-item__error" v-if="showSelectPaperError">
            请选择试卷
          </div>
        </el-form-item>
        <el-form-item label="补考次数限制" prop="RETEST_COUNT_LIMIT">
          <el-input-number
            v-model="submitFormTest.RETEST_COUNT_LIMIT"
            :min="0"
            :step="1"
            step-strictly
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="limitTimePerQuestion"
            >是否限制每题型作答时间</el-checkbox
          >
        </el-form-item>
        <el-form-item
          v-if="!limitTimePerQuestion"
          label="考试作答时间(分)"
          prop="TEST_TIME"
        >
          <el-input-number
            v-model="submitFormTest.TEST_TIME"
            :min="0"
            :step="1"
            step-strictly
          ></el-input-number>
        </el-form-item>
        <el-row v-if="limitTimePerQuestion">
          <el-col :span="5">
            <el-form-item label="单选题时间限制(秒)" prop="TEST_TIME_S_CHOICE">
              <el-input-number
                v-model="submitFormTest.TEST_TIME_S_CHOICE"
                :min="0"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="多选题时间限制(秒)" prop="TEST_TIME_M_CHOICE">
              <el-input-number
                v-model="submitFormTest.TEST_TIME_M_CHOICE"
                :min="0"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="填空题时间限制(秒)" prop="TEST_TIME_CLOZE">
              <el-input-number
                v-model="submitFormTest.TEST_TIME_CLOZE"
                :min="0"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="判断题时间限制(秒)" prop="TEST_TIME_JUDGE">
              <el-input-number
                v-model="submitFormTest.TEST_TIME_JUDGE"
                :min="0"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-checkbox v-model="NEED_CARD_TEST">是否需要刷卡</el-checkbox>
        </el-form-item>
        <el-form-item
          v-if="NEED_CARD_TEST"
          label="刷卡位置"
          prop="TEST_LOCATION"
        >
          <el-select v-model="submitFormTest.TEST_LOCATION">
            <el-option
              v-for="i in locations"
              :value="i"
              :label="i"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="currentStep--">上一步</el-button>
        <el-button type="primary" @click="addSubmit2">提交</el-button>
      </el-form>
    </div>

    <el-dialog title="选择试卷" :visible.sync="selectExamPaperShow" width="70%">
      <el-form :inline="true" :model="searchFormPaper" size="small">
        <el-form-item label="试卷编号">
          <el-input v-model="searchFormPaper.PAPER_ID"></el-input>
        </el-form-item>
        <el-form-item label="试卷名称">
          <el-input v-model="searchFormPaper.PAPER_NAME"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="searchFormPaper.PAPER_TYPE" clearable>
            <el-option
              v-for="(value, key) in paperTypeList"
              :label="value"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抽题类型">
          <el-select v-model="searchFormPaper.PAPER_RULE_TYPE" clearable>
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
              pageNumPaper = 1;
              getExamPaperList();
            "
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="paperData" border style="width: 100%" size="small">
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PAPER_ID"
          label="试卷编号"
          width="180"
        ></el-table-column>
        <el-table-column prop="PAPER_NAME" label="试卷名称"></el-table-column>
        <el-table-column label="试卷类型" width="100">
          <template slot-scope="scope">
            {{ paperTypeList[scope.row.PAPER_TYPE] }}
          </template>
        </el-table-column>
        <el-table-column label="抽题类型" width="100">
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
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="selectPaper(scope.row)" size="mini"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        layout="total, prev, pager, next"
        :total="totalPaper"
        :current-page.sync="pageNumPaper"
        :page-size="pageSizePaper"
        @current-change="handleCurrentChangePaper"
        style="text-align: center"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/https";
export default {
  data() {
    return {
      currentStep: 0,
      submitForm: {},
      rules: {
        COURSE_NAME: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        COURSE_BRIEF: [
          { required: true, message: "请输入课程简介", trigger: "blur" },
        ],
        COURSE_LOCATION: [
          { required: true, message: "请选择刷卡位置", trigger: "change" },
        ],
      },
      validTimeArray: [],
      locations: this.$store.getters.constants.LOCATION_LIST,
      NEED_CARD: false,
      showValidTimeError: false,
      employeeInfoList: [],
      checkStudentIds: [],
      checkStudents: [],
      departmentFilterText: "",
      departmentList: [],
      departmentProps: {
        children: "children",
        label: "label",
      },
      examMaterialGroups: [],
      examMaterialGroupsProps: {
        children: "children",
        label: "label",
      },
      examMaterialList: [],
      checkMaterialIds: [],
      checkMaterials: [],
      examMaterialGroupsFilterText: "",
      submitFormTest: { RETEST_COUNT_LIMIT: 0 },
      testRules: {
        TEST_NAME: [
          { required: true, message: "请输入考试名称", trigger: "blur" },
        ],
        RETEST_COUNT_LIMIT: [
          { required: true, message: "请输入补考次数限制", trigger: "blur" },
        ],
        TEST_TIME: [
          {
            required: true,
            message: "请输入考试作答时间(分)",
            trigger: "blur",
          },
        ],
        TEST_TIME_S_CHOICE: [
          {
            required: true,
            message: "请输入单选题时间限制(秒)",
            trigger: "blur",
          },
        ],
        TEST_TIME_M_CHOICE: [
          {
            required: true,
            message: "请输入多选题时间限制(秒)",
            trigger: "blur",
          },
        ],
        TEST_TIME_CLOZE: [
          {
            required: true,
            message: "请输入填空题时间限制(秒)",
            trigger: "blur",
          },
        ],
        TEST_TIME_JUDGE: [
          {
            required: true,
            message: "请输入判断题时间限制(秒)",
            trigger: "blur",
          },
        ],
        TEST_LOCATION: [
          { required: true, message: "请选择刷卡位置", trigger: "change" },
        ],
      },
      validTimeArrayTest: [],
      PAPER_ID: null,
      PAPER_NAME: null,
      selectExamPaperShow: false,
      searchFormPaper: {},
      paperTypeList: this.$store.getters.constants.PAPER_TYPE,
      paperRuleTypeList: this.$store.getters.constants.PAPER_RULE_TYPE,
      pageNumPaper: 1,
      pageSizePaper: 10,
      totalPaper: 0,
      paperData: [],
      showValidTimeErrorTest: false,
      showSelectPaperError: false,
      NEED_CARD_TEST: false,
      limitTimePerQuestion: false,
    };
  },
  created() {
    this.submitForm.COURSE_ID = this.getId();
  },
  watch: {
    departmentFilterText(val) {
      this.$refs.departmentTree.filter(val);
    },
    examMaterialGroupsFilterText(val) {
      this.$refs.examMaterialGroupsTree.filter(val);
    },
  },
  methods: {
    getId() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let date1 = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let millisecond = date.getMilliseconds();
      millisecond =
        millisecond < 10
          ? "00" + millisecond
          : millisecond < 100
          ? "0" + millisecond
          : millisecond;
      let day =
        "" + year + month + date1 + hour + minute + second + millisecond;
      return day;
    },
    validTimeChange() {
      this.showValidTimeError =
        !this.validTimeArray || this.validTimeArray.length == 0 ? true : false;
    },
    validForm() {
      let flag = 0;
      if (this.validTimeArray.length == 0) {
        this.showValidTimeError = true;
        flag = 1;
      }
      this.$refs.submitForm.validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          if (flag == 0) {
            this.currentStep++;
            this.getAllDepartmentAndArea();
            this.submitForm.START_TIME = this.validTimeArray[0];
            this.submitForm.END_TIME = this.validTimeArray[1];
            this.submitForm.NEED_CARD = this.NEED_CARD ? "Y" : "N";
            if (!this.NEED_CARD) {
              this.$set(this.submitForm, "COURSE_LOCATION", null);
            }
            this.submitForm.CREATER = this.$store.getters.userInfo.user;
            this.submitForm.TYPE = 1;
          }
        }
      });
    },
    async getAllDepartmentAndArea() {
      const config = {
        url: "/Hr/getAllDepartmentAndArea",
        method: "get",
      };
      const res = await http(config);
      this.departmentList = res.data;
    },
    filterDepartment(value, data) {
      if (!value) return true;
      return (
        data.data.DEPARTMENT.indexOf(value) !== -1 ||
        (data.data.AREA ? data.data.AREA.indexOf(value) !== -1 : false)
      );
    },
    departmentClick(data) {
      this.getHrmEmployeeInfoList(data.data);
    },
    async getHrmEmployeeInfoList(data) {
      data.pageNum = 1;
      data.pageSize = 0;
      const config = {
        url: "/examCourse/getHrmEmployeeInfoList",
        method: "get",
        data: data,
      };
      const res = await http(config);
      let list = res.data.list;
      for (let i in this.checkStudents) {
        let id1 = this.checkStudents[i].STUDENT;
        let exist = false;
        for (let j in list) {
          let id2 = list[j].STUDENT;
          if (id1 == id2) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          let data = this.checkStudents[i];
          data.flag = 1;
          list.push(data);
        }
      }
      this.employeeInfoList = list;
    },
    checkStudentChange(newValue, direction, moveValue) {
      for (let k in moveValue) {
        let v = moveValue[k];
        if (direction == "right") {
          for (let i in this.employeeInfoList) {
            let id = this.employeeInfoList[i].STUDENT;
            if (v == id) {
              this.checkStudents.push(this.employeeInfoList[i]);
              break;
            }
          }
        } else if (direction == "left") {
          for (let j in this.checkStudents) {
            let id = this.checkStudents[j].STUDENT;
            if (v == id) {
              this.checkStudents.splice(j, 1);
              break;
            }
          }
          for (let j in this.employeeInfoList) {
            let id = this.employeeInfoList[j].STUDENT;
            if (v == id) {
              let flag = this.employeeInfoList[j].flag;
              if (flag && flag == 1) {
                this.employeeInfoList.splice(j, 1);
                break;
              }
            }
          }
        }
      }
    },
    employeeInfoFilter(query, item) {
      return item.STUDENT.indexOf(query) > -1 || item.NAME.indexOf(query) > -1;
    },
    validStudent() {
      if (this.checkStudents.length == 0) {
        this.$message.error("请选择人员！");
        return false;
      }
      this.currentStep++;
      this.submitForm.examCourseStudentLists = this.checkStudents;
      this.getExamMaterialGroups();
    },
    async getExamMaterialGroups() {
      const config = {
        url: "/examCourse/getExamMaterialGroups",
        method: "get",
      };
      const res = await http(config);
      this.examMaterialGroups = res.data;
    },
    materialGroupsClick(data) {
      this.getExamMaterialList(data.data);
    },
    async getExamMaterialList(data) {
      const config = {
        url: "/examCourse/getExamMaterialList",
        method: "get",
        data: data,
      };
      const res = await http(config);
      let list = res.data;
      for (let i in this.checkMaterials) {
        let id1 = this.checkMaterials[i].ID;
        let exist = false;
        for (let j in list) {
          let id2 = list[j].ID;
          if (id1 == id2) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          let data = this.checkMaterials[i];
          data.flag = 1;
          list.push(data);
        }
      }
      this.examMaterialList = list;
    },
    checkMaterialChange(newValue, direction, moveValue) {
      for (let k in moveValue) {
        let v = moveValue[k];
        if (direction == "right") {
          for (let i in this.examMaterialList) {
            let id = this.examMaterialList[i].ID;
            if (v == id) {
              this.checkMaterials.push(this.examMaterialList[i]);
              break;
            }
          }
        } else if (direction == "left") {
          for (let j in this.checkMaterials) {
            let id = this.checkMaterials[j].ID;
            if (v == id) {
              this.checkMaterials.splice(j, 1);
              break;
            }
          }
          for (let j in this.examMaterialList) {
            let id = this.examMaterialList[j].ID;
            if (v == id) {
              let flag = this.examMaterialList[j].flag;
              if (flag && flag == 1) {
                this.examMaterialList.splice(j, 1);
                break;
              }
            }
          }
        }
      }
    },
    materialFilter(query, item) {
      return (
        item.MATERIAL_NAME.indexOf(query) > -1 ||
        item.MATERIAL_ID.indexOf(query) > -1
      );
    },
    filterMaterialGroups(value, data) {
      if (!value) return true;
      return (
        data.data.COMPANY.indexOf(value) !== -1 ||
        (data.data.DEPARTMENT
          ? data.data.DEPARTMENT.indexOf(value) !== -1
          : false) ||
        (data.data.AREA ? data.data.AREA.indexOf(value) !== -1 : false) ||
        (data.data.JOB ? data.data.JOB.indexOf(value) !== -1 : false) ||
        (data.data.SKILL ? data.data.SKILL.indexOf(value) !== -1 : false)
      );
    },
    validMaterial() {
      if (this.checkMaterials.length == 0) {
        this.$message.error("请选择教材！");
        return false;
      }
      this.currentStep++;
      this.submitForm.examCourseMaterials = this.checkMaterials;
      this.submitForm.TEST_ID = this.getId();
      this.submitFormTest.TEST_ID = this.submitForm.TEST_ID;
    },
    addSubmit1() {
      if (this.checkMaterials.length == 0) {
        this.$message.error("请选择教材！");
        return false;
      }
      this.submitForm.examCourseMaterials = this.checkMaterials;
      this.addExamCourse();
    },
    openSelectPaper() {
      this.selectExamPaperShow = true;
      this.getExamPaperList();
    },
    handleCurrentChangePaper(page) {
      this.pageNumPaper = page;
      this.getExamPaperList();
    },
    selectPaper(row) {
      this.PAPER_ID = row.PAPER_ID;
      this.PAPER_NAME = row.PAPER_NAME;
      this.selectExamPaperShow = false;
      this.showSelectPaperError = false;
    },
    async getExamPaperList() {
      this.searchFormPaper.pageNum = this.pageNumPaper;
      this.searchFormPaper.pageSize = this.pageSizePaper;
      const config = {
        url: "/examPaper/getExamPaperList",
        method: "get",
        data: this.searchFormPaper,
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.paperData = res.data.list;
        this.totalPaper = res.data.total;
      }
    },
    validTimeChangeTest() {
      this.showValidTimeErrorTest =
        !this.validTimeArrayTest || this.validTimeArrayTest.length == 0
          ? true
          : false;
    },
    addSubmit2() {
      let flag = 0;
      if (this.validTimeArrayTest.length == 0) {
        this.showValidTimeErrorTest = true;
        flag = 1;
      }
      if (!this.PAPER_ID) {
        this.showSelectPaperError = true;
        flag = 1;
      }
      this.$refs.submitFormTest.validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          if (flag == 0) {
            this.submitFormTest.START_TIME = this.validTimeArrayTest[0];
            this.submitFormTest.END_TIME = this.validTimeArrayTest[1];
            this.submitFormTest.PAPER_ID = this.PAPER_ID;
            if (this.limitTimePerQuestion) {
              this.submitFormTest.TEST_TIME = null;
            } else {
              this.submitFormTest.TEST_TIME_S_CHOICE = null;
              this.submitFormTest.TEST_TIME_M_CHOICE = null;
              this.submitFormTest.TEST_TIME_CLOZE = null;
              this.submitFormTest.TEST_TIME_JUDGE = null;
            }
            this.submitFormTest.NEED_CARD = this.NEED_CARD_TEST ? "Y" : "N";
            if (!this.NEED_CARD_TEST) {
              this.submitFormTest.TEST_LOCATION = null;
            }
            this.submitForm.exam_test = this.submitFormTest;
            this.addExamCourse();
          }
        }
      });
    },
    async addExamCourse() {
      const config = {
        url: "/examCourse/addExamCourse",
        method: "post",
        data: this.submitForm,
      };
      await http(config);
      this.$message.success("创建成功！");
      this.$router.push({ path: "/examCourse/list" });
    },
  },
};
</script>

<style>
#examCourseAdd .el-transfer-panel {
  width: 400px;
  height: 600px;
}
#examCourseAdd .el-transfer-panel__list.is-filterable {
  height: 450px;
}
.tree-box {
  display: flex;
  flex-direction: row;
}
.tree-search {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}
</style>
