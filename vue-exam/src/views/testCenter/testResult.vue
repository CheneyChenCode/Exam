<template>
  <div id="testResult" style="height: 100%">
    <div id="header">
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        <el-breadcrumb-item>考试结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="5"
        ><div>
          <el-button
            style="position: relative; left: 30px"
            type="primary"
            size="normal"
            @click="showMenu"
            >目录</el-button
          >
        </div></el-col
      >
      <el-col :span="11"></el-col>
    </el-row>
    <el-divider></el-divider>
    <div id="main">
      <!--  单选题 -->
      <div
        v-if="this.TestResult.questList[pageNum - 1].questType == '单选题'"
        style="
          position: relative;
          width: 75%;
          height: 100%;
          border: 0.5px solid gray;
          border-radius: 12px;
          left: 10%;
        "
      >
        <!-- 单选分数题数提示 -->
        <el-row type="flex" style="position: relative; left: 5%; top: 5%">
          <el-col :span="6"
            ><span class="item_key"
              ><el-button
                type="primary"
                round
                style="position: relative"
                size="small"
                >单选题</el-button
              ></span
            ></el-col
          >
          <el-col :span="8" style="position: relative; line-height: 32px"
            >第{{ pageNum }}题({{
              this.TestResult.questList[pageNum - 1].questScore
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{ TestResult.questList[pageNum - 1].questContext }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- <el-row type="flex" style="position: relative; top: 8%; left: 45%">
          <el-col
            :span="24"
            v-if="TestResult.questList[pageNum - 1].isCorrect == '1'"
            style="position: relative; top: 10px; color: deepskyblue"
            >回答正确√</el-col
          >
          <el-col
            :span="24"
            v-else
            style="position: relative; top: 10px; color: red"
            >回答错误X</el-col
          >
        </el-row> -->
        <!-- 选项 -->
        <el-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
          style="
            position: relative;
            top: 12%;
            width: 100%;
            font-size: 25px;
            left: 6%;
          "
          id="erGroup"
        >
          <el-col
            v-for="(item, index) in TestResult.questList[pageNum - 1].options"
            v-bind:key="index"
            :span="22"
            :offset="1"
          >
            <el-radio
              :label="item.questItemLetter"
              :key="index"
              border
              style="border-radius: 12px; margin: 5px; border-color: black"
              disabled
              id="eRadio"
              >{{ item.questItemLetter }}.{{ item.questItemContext }}</el-radio
            >
          </el-col>
        </el-radio-group>
        <!--  -->
      </div>
      <!-- 多选题 -->
      <div
        v-if="this.TestResult.questList[pageNum - 1].questType == '多选题'"
        style="
          position: relative;
          width: 75%;
          height: 100%;
          border: 0.5px solid gray;
          border-radius: 12px;
          left: 10%;
        "
      >
        <!-- 题数题型提示 -->
        <el-row type="flex" style="position: relative; left: 5%; top: 5%">
          <el-col :span="6"
            ><span class="item_key"
              ><el-button
                type="primary"
                round
                style="position: relative"
                size="small"
                >多选题</el-button
              ></span
            ></el-col
          >
          <el-col :span="8" style="position: relative; line-height: 32px"
            >第{{ pageNum }}题({{
              this.TestResult.questList[pageNum - 1].questScore
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid black; padding: 5px; border-radius: 12px"
            >{{ TestResult.questList[pageNum - 1].questContext }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 正误 -->
        <!-- <el-row type="flex" style="position: relative; top: 8%; left: 45%">
          <el-col
            :span="24"
            v-if="TestResult.questList[pageNum - 1].isCorrect == '1'"
            style="position: relative; top: 10px; color: deepskyblue"
            >回答正确√</el-col
          >
          <el-col
            :span="24"
            v-else
            style="position: relative; top: 10px; color: red"
            >回答错误X</el-col
          >
        </el-row> -->
        <!-- 选项 -->
        <el-checkbox-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
          style="
            position: relative;
            top: 12%;
            width: 100%;
            font-size: 40px;
            color: black;
            left: 6%;
            color: black;
          "
          id="ecGroup"
        >
          <el-col
            v-for="(item, index) in TestResult.questList[pageNum - 1].options"
            :span="22"
            :offset="1"
            v-bind:key="index"
          >
            <el-checkbox
              :label="item.questItemLetter"
              style="
                border: 0.5px solid gray;
                padding: 5px;
                border-radius: 12px;
                margin: 5px;
                color: black;
              "
              disabled
              id="eCheck"
              >{{ item.questItemLetter }}.{{
                item.questItemContext
              }}</el-checkbox
            >
          </el-col>
          <el-col :span="2"></el-col>
        </el-checkbox-group>
      </div>
      <!-- 判断题 -->
      <div
        v-if="this.TestResult.questList[pageNum - 1].questType == '判断题'"
        style="
          position: relative;
          width: 75%;
          height: 100%;
          border: 0.5px solid gray;
          border-radius: 12px;
          left: 10%;
        "
      >
        <!-- 题型题数提示 -->
        <el-row type="flex" style="position: relative; left: 5%; top: 5%">
          <el-col :span="6"
            ><span class="item_key"
              ><el-button
                type="primary"
                round
                style="position: relative"
                size="small"
                >判断题</el-button
              ></span
            ></el-col
          >
          <el-col :span="8" style="position: relative; line-height: 32px"
            >第{{ pageNum }}题({{
              this.TestResult.questList[pageNum - 1].questScore
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{ TestResult.questList[pageNum - 1].questContext }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 正误 -->
        <!-- <el-row type="flex" style="position: relative; top: 8%; left: 45%">
          <el-col
            :span="24"
            v-if="TestResult.questList[pageNum - 1].isCorrect == '1'"
            style="position: relative; top: 10px; color: deepskyblue"
            >回答正确√</el-col
          >
          <el-col
            :span="24"
            v-else
            style="position: relative; top: 10px; color: red"
            >回答错误X</el-col
          >
        </el-row> -->
        <!-- 选项 -->
        <el-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
          style="
            position: relative;
            top: 12%;
            width: 100%;
            font-size: 25px;
            left: 6%;
          "
          id="erGroup"
        >
          <el-col
            v-for="(item, index) in TestResult.questList[pageNum - 1].options"
            v-bind:key="index"
            :span="22"
            :offset="1"
          >
            <el-radio
              :label="item.questItemLetter"
              :key="index"
              border
              style="border-radius: 12px; margin: 5px"
              disabled
              id="eRadio"
              >{{ item.questItemLetter }}.{{ item.questItemContext }}</el-radio
            >
          </el-col>
        </el-radio-group>
        <!--  -->
      </div>
      <!-- 填空题 -->
      <div
        v-if="this.TestResult.questList[pageNum - 1].questType == '填空题'"
        style="
          position: relative;
          width: 80%;
          height: 100%;
          border: 0.5px solid gray;
          border-radius: 12px;
          left: 10%;
        "
      >
        <!-- 题型题数提示 -->
        <el-row type="flex" style="position: relative; left: 5%; top: 5%">
          <el-col :span="6"
            ><span class="item_key"
              ><el-button
                type="primary"
                round
                style="position: relative"
                size="small"
                >填空题</el-button
              ></span
            ></el-col
          >
          <el-col :span="8" style="position: relative; line-height: 32px"
            >第{{ pageNum }}题({{
              this.TestResult.questList[pageNum - 1].questScore
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{ TestResult.questList[pageNum - 1].questContext }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 正误 -->
        <!-- <el-row type="flex" style="position: relative; top: 8%; left: 45%">
          <el-col
            :span="24"
            v-if="TestResult.questList[pageNum - 1].isCorrect == '1'"
            style="position: relative; top: 10px; color: deepskyblue"
            >回答正确√</el-col
          >
          <el-col
            :span="24"
            v-else
            style="position: relative; top: 10px; color: red"
            >回答错误X</el-col
          >
        </el-row> -->
        <!-- 选项 -->
        <div
          style="
            position: relative;
            height: calc(100% - 200px);
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            top: 10%;
          "
        >
          <el-checkbox-group
            id="questField"
            style="position: relative; width: 100%; font-size: 25px; left: 6%"
          >
            <el-col
              v-for="(item, index) in TestResult.questList[pageNum - 1].options"
              :span="22"
              :offset="1"
              v-bind:key="index"
            >
              <div style="position: relative">
                {{ item.questItemLetter }}.
                <el-input
                  v-model="
                    response.testContext[pageNum - 1].quest_ANSWER[index]
                  "
                  :label="item.questItemLetter + '.'"
                  style="position: relative; margin: 5px; width: 80%"
                  disabled
                  id="eInput"
                ></el-input>
              </div>
            </el-col>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!-- 目录弹出层 -->
    <el-dialog
      title="目录"
      :visible.sync="Popup"
      width="53%"
      height="100%"
      padding="5px"
      center
    >
      <div
        style="
          position: relative;
          width: 100%;
          height: 100%;
          border: 0.5px solid gray;
        "
      >
        <el-button
          v-for="(item, index) in TestResult.questList"
          v-bind:key="index"
          @click="jumpToQuestion(index)"
        >
          <!-- 正确错误标识 -->
          <!-- <span v-if="item.isCorrect == 1">题目{{ index + 1 }} 正确</span>
          <span v-else style="background-color: red"
            >题目{{ index + 1 }} 错误</span
          > -->
          <!-- 无正误标识 -->
          <span>题目{{ index + 1 }}</span>
        </el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      layout=" prev, next"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      prev-text="上一题"
      :total="total"
      next-text="下一题"
      @current-change="PaginationChange"
      style="position: sticky; text-align: center; padding: 20px"
      id="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import http from "@/https";
export default {
  name: "testResult",
  data() {
    return {
      pageNum: 1, // 页码
      pageSize: 1, // 一页显示的数据
      total: 0, // 总题数
      userId: "", // 用户id
      testId: "", // 考试id
      TestResult: {
        testId: "",
        questBankId: "",
        questBanVersion: "",
        questList: [
          {
            questId: "",
            questType: "",
            questContext: "",
            questScore: "",
            questAnswer: "",
            questLabel: "",
            questLevel: "",
            questExplain: "",
            isCorrect: "",
            options: [
              {
                questId: "",
                questItemContext: "",
                questItemLetter: "",
              },
            ],
          },
        ],
      }, // 考试结果
      response: {
        testContext: [
          {
            quest_ID: "",
            quest_ANSWER: [],
            quest_SCORE: "",
            quest_TYPE: "",
            option_ITEM_LETTER: "",
          },
        ],
      }, // 考生回答的答案
      Popup: false, // 控制弹出层
    };
  },
  computed: {
    employ_id() {
      return this.$store.getters.userInfo.employ_id;
    },
  },
  watch: {
    employ_id: {
      handler(newVal) {
        // eslint-disable-next-line no-empty
        if (newVal) {
          this.getHistoryContextResult();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    PaginationChange(page) {
      this.pageNum = page;
    },
    jumpToQuestion(index) {
      this.Popup = false;
      this.pageNum = index + 1;
    },
    // 题目跳转
    showMenu() {
      this.Popup = true;
    },
    // 获取考试结果
    getHistoryContextResult() {
      const getHistoryContextResult = {
        url: "/GetTest/getHistoryContextResultByEmployId",
        method: "get",
        data: {
          userId: this.employ_id,
          testId: this.$route.query.testId,
        },
      };
      http(getHistoryContextResult).then((res) => {
        this.TestResult = res.data;
        this.total = this.TestResult.questList.length;
        console.log("结果", this.TestResult);
        this.response.testContext = [];
        this.TestResult.questList.forEach((item) => {
          if (item.questType == "填空题") {
            this.response.testContext.push({
              quest_ID: item.questId,
              quest_ANSWER: new Array(item.options.length),
              quest_SCORE: item.questScore,
              quest_TYPE: item.questType,
            });
          } else if (item.questType == "多选题") {
            this.response.testContext.push({
              quest_ID: item.questId,
              quest_ANSWER: [],
              quest_SCORE: item.questScore,
              quest_TYPE: item.questType,
            });
          } else {
            this.response.testContext.push({
              quest_ID: item.questId,
              quest_ANSWER: "",
              quest_SCORE: item.questScore,
              quest_TYPE: item.questType,
            });
          }
        });
        this.TestResult.questList.forEach((item) => {
          this.response.testContext.forEach((list) => {
            if (item.questId == list.quest_ID) {
              if (item.questType == "多选题" || item.questType == "填空题") {
                list.quest_ANSWER = item.questAnswer.split(",");
              } else {
                list.quest_ANSWER = item.questAnswer;
              }
            }
          });
        });
      });
    },
  },
};
</script>
<style scoped>
.testResult {
  height: 100%;
  width: 100%;
}
.pagination {
  position: fixed;
  bottom: 0px;
}
#main {
  position: relative;
  height: 70%;
  width: 100%;
}
#eRadio >>> .el-radio__input.is-disabled + span.el-radio__label {
  color: black;
}
#eRadio >>> .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: brown;
}
s.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: black;
}
#ecGroup >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: black;
}
#ecGroup
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: brown;
}
#questField >>> .el-input.is-disabled .el-input__inner {
  color: black;
  border-color: black;
}
</style>
