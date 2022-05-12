<template>
  <div id="examPaperAdd">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
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
      <el-step title="2.选择题库"></el-step>
      <el-step title="3.创建成功"></el-step>
    </el-steps>
    <div v-show="currentStep == 0">
      <el-form
        ref="submitForm"
        :model="submitForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="试卷编号" prop="PAPER_ID" required>
          <el-input
            v-model="submitForm.PAPER_ID"
            style="width: 250px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷名称" prop="PAPER_NAME">
          <el-input
            v-model.trim="submitForm.PAPER_NAME"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷类型" prop="PAPER_TYPE">
          <el-radio-group v-model="submitForm.PAPER_TYPE">
            <el-radio
              v-for="(value, key) in paperTypeList"
              :label="key"
              :key="key"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽题类型" prop="PAPER_RULE_TYPE" required>
          <el-radio-group v-model="submitForm.PAPER_RULE_TYPE" disabled>
            <el-radio
              v-for="(value, key) in paperRuleTypeList"
              :label="key"
              :key="key"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽题规则" prop="PAPER_RULE_ID">
          <el-select v-model="submitForm.PAPER_RULE_ID" style="width: 380px">
            <el-option
              v-for="i in paperRuleList"
              :value="i.PAPER_RULE_ID"
              :label="i.COMMENT"
              :key="i.PAPER_RULE_ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷总分" prop="TOTAL_SCORE">
          <el-input-number
            v-model="submitForm.TOTAL_SCORE"
            :min="0.1"
            :step="0.1"
            step-strictly
          ></el-input-number>
          <span style="margin-left: 10px; color: #606266"
            >如果无总分则按照题目配分加总，有总分则每题按照总分分配</span
          >
        </el-form-item>
        <el-form-item label="及格线" prop="PASSING_GRADE">
          <el-input
            v-model.trim="submitForm.PASSING_GRADE"
            style="width: 250px"
          ></el-input>
          <span style="margin-left: 10px; color: #606266"
            >固定分数或试卷总分百分比，例如：60或60%</span
          >
        </el-form-item>
        <el-button type="primary" @click="validForm">下一步</el-button>
      </el-form>
    </div>
    <div v-show="currentStep == 1" class="tree-box">
      <div class="tree-search">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="questBankGroupsFilterText"
          style="width: 250px"
        ></el-input>
        <el-tree
          ref="questBankGroupsTree"
          :data="questBankGroups"
          :props="questBankGroupsProps"
          @node-click="questBankGroupsClick"
          :filter-node-method="filterQuestBankGroups"
          highlight-current
          :default-expand-all="true"
          :expand-on-click-node="false"
          style="display: inline-block; overflow-y: auto; height: 600px"
        ></el-tree>
      </div>
      <div>
        <el-transfer
          v-model="checkQuestBankIds"
          :data="questBankList"
          :titles="['待选列表', '已选列表']"
          :button-texts="['移除', '选择']"
          :props="{ key: 'ID', label: 'QUEST_BANK_ID' }"
          target-order="push"
          @change="checkQuestBankChange"
          filterable
          filter-placeholder="请输入题库名称"
        ></el-transfer>
        <div style="margin-top: 20px; text-align: center">
          <el-button @click="currentStep--">上一步</el-button>
          <el-button type="primary" @click="addSubmit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/https";
export default {
  data() {
    return {
      currentStep: 0,
      submitForm: { PAPER_RULE_TYPE: "1" },
      rules: {
        PAPER_NAME: [
          { required: true, message: "请输入试卷名称", trigger: "blur" },
        ],
        PAPER_TYPE: [
          { required: true, message: "请选择试卷类型", trigger: "change" },
        ],
        PAPER_RULE_TYPE: [
          { required: true, message: "请选择抽题类型", trigger: "change" },
        ],
        PAPER_RULE_ID: [
          { required: true, message: "请选择抽题规则", trigger: "change" },
        ],
        PASSING_GRADE: [
          { required: true, message: "请输入及格线", trigger: "blur" },
        ],
      },
      paperTypeList: this.$store.getters.constants.PAPER_TYPE,
      paperRuleTypeList: this.$store.getters.constants.PAPER_RULE_TYPE,
      paperRuleList: [],
      questBankGroupsFilterText: "",
      questBankGroups: [],
      questBankGroupsProps: {
        children: "children",
        label: "label",
      },
      questBankList: [],
      checkQuestBankIds: [],
      checkQuestBanks: [],
    };
  },
  created() {
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
    let day = "" + year + month + date1 + hour + minute + second + millisecond;
    this.submitForm.PAPER_ID = day;
    this.getExamPaperRuleList();
  },
  watch: {
    questBankGroupsFilterText(val) {
      this.$refs.questBankGroupsTree.filter(val);
    },
  },
  methods: {
    async getExamPaperRuleList() {
      const config = {
        url: "/examPaper/getExamPaperRuleList",
        method: "get",
      };
      const res = await http(config);
      this.paperRuleList = res.data;
    },
    validForm() {
      this.$refs.submitForm.validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          this.currentStep++;
          this.getQuestBankGroups();
        }
      });
    },
    async getQuestBankGroups() {
      const config = {
        url: "/examQuestion/getQuestBankGroups",
        method: "get",
      };
      const res = await http(config);
      this.questBankGroups = res.data;
    },
    questBankGroupsClick(data) {
      this.getQuestBankList(data.data);
    },
    async getQuestBankList(data) {
      const config = {
        url: "/examQuestion/getQuestBankList",
        method: "get",
        data: data,
      };
      const res = await http(config);
      let list = res.data;
      for (let i in this.checkQuestBanks) {
        let id1 = this.checkQuestBanks[i].ID;
        let exist = false;
        for (let j in list) {
          let id2 = list[j].ID;
          if (id1 == id2) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          let data = this.checkQuestBanks[i];
          data.flag = 1;
          list.push(data);
        }
      }
      this.questBankList = list;
    },
    filterQuestBankGroups(value, data) {
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
    checkQuestBankChange(newValue, direction, moveValue) {
      for (let k in moveValue) {
        let v = moveValue[k];
        if (direction == "right") {
          for (let i in this.questBankList) {
            let id = this.questBankList[i].ID;
            if (v == id) {
              this.checkQuestBanks.push(this.questBankList[i]);
              break;
            }
          }
        } else if (direction == "left") {
          for (let j in this.checkQuestBanks) {
            let id = this.checkQuestBanks[j].ID;
            if (v == id) {
              this.checkQuestBanks.splice(j, 1);
              break;
            }
          }
          for (let j in this.questBankList) {
            let id = this.questBankList[j].ID;
            if (v == id) {
              let flag = this.questBankList[j].flag;
              if (flag && flag == 1) {
                this.questBankList.splice(j, 1);
                break;
              }
            }
          }
        }
      }
    },
    async addSubmit() {
      if (this.checkQuestBanks.length == 0) {
        this.$message.error("请选择题库！");
        return false;
      }
      this.submitForm.CREATER = this.$store.getters.userInfo.user;
      this.submitForm.examQuestionBankList = this.checkQuestBanks;
      const config = {
        url: "/examPaper/addExamPaper",
        method: "post",
        data: this.submitForm,
      };
      await http(config);
      this.$message.success("创建成功！");
      this.$router.push({ path: "/examPaper/list" });
    },
  },
};
</script>

<style>
#examPaperAdd .el-transfer-panel {
  width: 400px;
  height: 600px;
}
#examPaperAdd .el-transfer-panel__list.is-filterable {
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
