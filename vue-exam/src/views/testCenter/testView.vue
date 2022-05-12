<template>
  <div id="testView" style="height: 100%">
    <div id="header">
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        <el-breadcrumb-item
          >考试: {{ PaperQuestionList.TEST_NAME }}</el-breadcrumb-item
        >
        {{ PaperQuestionList.exam_paper.examQuestionList[0].QUEST_TYPE }}
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
      <el-col :span="8"
        ><div
          style="position: relative; top: 16px; text-align: 40px; left: 50%"
        >
          {{ PaperQuestionList.TEST_NAME }}
        </div></el-col
      >
      <el-col :span="11"
        ><div
          v-if="testTimeType == 'N'"
          style="position: relative; left: 50%; top: 16px"
        >
          考试剩余时间: <span>{{ restTime }}</span>
        </div>
        <div v-else style="position: relative; left: 60%; top: 16px">
          本题剩余时间: <span>{{ goTonextRestTime }} 秒</span>
        </div></el-col
      >
    </el-row>
    <el-divider></el-divider>
    <div id="main">
      <!--  单选题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '单选题'
        "
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
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_CONTEXT
            }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 选项 -->
        <el-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
          style="
            position: relative;
            top: 12%;
            width: 100%;
            font-size: 25px;
            left: 6%;
            color: black;
          "
        >
          <el-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            v-bind:key="index"
            :span="22"
            :offset="1"
          >
            <el-radio
              :label="item.OPTION_ITEM_LETTER"
              :key="index"
              border
              style="border-radius: 12px; margin: 5px"
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</el-radio
            >
          </el-col>
        </el-radio-group>
        <!--  -->
      </div>
      <!-- 多选题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '多选题'
        "
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
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_CONTEXT
            }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
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
        >
          <el-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            :span="22"
            :offset="1"
            v-bind:key="index"
          >
            <el-checkbox
              :label="item.OPTION_ITEM_LETTER"
              style="
                border: 0.5px solid gray;
                padding: 5px;
                border-radius: 12px;
                margin: 5px;
              "
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</el-checkbox
            >
          </el-col>
          <el-col :span="2"></el-col>
        </el-checkbox-group>
      </div>
      <!-- 判断题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '判断题'
        "
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
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_CONTEXT
            }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 选项 -->
        <el-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
          style="
            position: relative;
            top: 12%;
            width: 100%;
            font-size: 25px;
            left: 6%;
            color: black;
          "
        >
          <el-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            v-bind:key="index"
            :span="22"
            :offset="1"
          >
            <el-radio
              :label="item.OPTION_ITEM_LETTER"
              :key="index"
              border
              style="border-radius: 12px; margin: 5px"
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</el-radio
            >
          </el-col>
        </el-radio-group>
        <!--  -->
      </div>
      <!-- 填空题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '填空题'
        "
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
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</el-col
          >
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 内容 -->
        <el-row type="flex" style="position: relative; top: 8%; left: 5%">
          <el-col
            :span="22"
            style="border: 0.5px solid gray; padding: 5px; border-radius: 12px"
            >{{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_CONTEXT
            }}</el-col
          >
          <el-col :span="2"></el-col>
        </el-row>
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
            style="
              position: relative;
              width: 100%;
              font-size: 25px;
              left: 6%;
              color: black;
            "
          >
            <el-col
              v-for="(item, index) in PaperQuestionList.exam_paper
                .examQuestionList[pageNum - 1].examQuestionOptionList"
              :span="22"
              :offset="1"
              v-bind:key="index"
            >
              <div style="position: relative">
                {{ item.OPTION_ITEM_LETTER }}.
                <el-input
                  v-model="
                    response.testContext[pageNum - 1].quest_ANSWER[index]
                  "
                  :label="item.OPTION_ITEM_LETTER + '.'"
                  style="position: relative; margin: 5px; width: 80%"
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
      :visible.sync="centerDialogVisible"
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
          v-for="(item, index) in PaperQuestionList.exam_paper.examQuestionList"
          v-bind:key="index"
          @click="jumpToQuestion(index)"
        >
          <span
            v-if="
              response.testContext[index].quest_ANSWER
                .toString()
                .replace(/,/g, '').length == 0
            "
            >题目{{ index + 1 }} 未答</span
          >
          <span v-else style="background-color: cornflowerblue"
            >题目{{ index + 1 }} 已答</span
          >
        </el-button>
      </div>
    </el-dialog>
    <!-- 结束考试弹出层 -->
    <el-dialog
      title="结束考试"
      :visible.sync="finishPopup"
      class="pub_dialog"
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
        <el-row>
          <el-col
            :span="24"
            style="
              position: relative;
              top: 10px;
              left: 10px;
              font-size: 30px;
              text-align: center;
            "
            >答题人:{{ userInfo }}</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              top: 40px;
              left: 10px;
              font-size: 30px;
              text-align: center;
            "
            >答题数:{{ havaAnswerCount }}/{{
              PaperQuestionList.exam_paper.examQuestionList.length
            }}</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              top: 70px;
              left: 10px;
              font-size: 30px;
              text-align: center;
            "
            >考试时长:{{ ElapsedTime }}</el-col
          >
          <el-col
            :span="24"
            style="
              position: relative;
              top: 100px;
              left: 10px;
              font-size: 30px;
              text-align: center;
            "
            >考试名称:{{ PaperQuestionList.TEST_NAME }}</el-col
          >
        </el-row>
        <el-button
          style="
            position: relative;
            background-color: dodgerblue;
            color: #f2f2f2;
            width: 80px;
            left: 30%;
            top: 140px;
          "
          round
          @click="cancelFinishTest"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="
            position: relative;
            color: #f2f2f2;
            width: 80px;
            left: 45%;
            top: 140px;
          "
          round
          @click="submitFinishTest"
          >确定</el-button
        >
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
      style="position: relative; text-align: center; padding: 20px"
      id="pagination"
    >
    </el-pagination>
    <el-button
      v-if="pageNum == total"
      @click="showFinishTest"
      style="position: relative; left: 50%; bottom: 8%; height: 50px"
      size="normal"
      type="danger"
      >结束考试</el-button
    >
  </div>
</template>

<script>
import http from "@/https";
export default {
  data() {
    return {
      total: 0, // 总题数
      pageNum: 1, // 当前页码
      pageSize: 1, // 一页显示的内容数
      centerDialogVisible: false, // 目录弹出层
      testTimeType: "N", // 考试时间判断，N为testTime，Y为每题时间
      judgeCount: 0, // 判断题数量
      singleSelectCount: 0, // 单选题数量
      multipleSelectCount: 0, // 多选题数量
      fillingCount: 0, // 填空题数量
      goTonextTime: 0, // 判断是否切换到下一页时间
      goTonextRestTime: 0,
      routerPath: "", // 判断从哪个页面进入
      restTimeStamp: "", // 存储剩余时间戳
      restTimeMinutes: "", // 存储剩余分钟
      hiddenProperty: null, // 判断切屏
      visibilityChangeEvent: null, // 判断切屏
      changeScreenTimes: 0, // 计算切屏次数
      changeColor: "", // 切换颜色
      changeText: "", // 切换文本
      userId: "", // 答题人工号
      userInfo: "", // 答题人工号加姓名
      nonPageNum: 1, // 判断是否点击上一页
      havaAnswerCount: 0, // 记录多少题已答
      answerContent: [], // 记录当前题目值
      PaperQuestionList: {
        TEST_ID: "",
        PAPER_ID: "",
        PRE_TEST_ID: null,
        START_TIME: "",
        END_TIME: "",
        CREATE_TIME: "",
        CREATER: "",
        UPDATE_TIME: "",
        UPDATER: "",
        DELETE_FLAG: "",
        TEST_NAME: "",
        TEST_TIME: "",
        TEST_TIME_CLOZE: "",
        TEST_TIME_JUDGE: "",
        TEST_TIME_M_CHOICE: "",
        TEST_TIME_S_CHOICE: "",
        exam_paper: {
          PAPER_ID: "",
          PAPER_NAME: "",
          PAPER_TYPE: "",
          PAPER_RULE_TYPE: null,
          PAPER_RULE_ID: null,
          TOTAL_SCORE: null,
          PASSING_GRADE: "",
          CREATE_TIME: "",
          CREATER: "",
          UPDATE_TIME: "",
          UPDATER: "",
          DELETE_FLAG: "",
          examPaperContextList: [
            {
              PAPER_ID: "",
              QUEST_BANK_ID: "",
              QUEST_BANK_VERSION: "",
              QUEST_ID: null,
              CREATE_TIME: "",
              CREATER: "",
              UPDATE_TIME: "",
              UPDATER: "",
            },
          ],
          RULE: "",
          RULE_COMMENT: "",
          examQuestionList: [
            {
              QUEST_BANK_ID: "",
              QUEST_BANK_VERSION: "",
              QUEST_ID: "",
              QUEST_TYPE: "",
              QUEST_CONTEXT: "",
              QUEST_LABEL: "",
              QUEST_SCORE: null,
              QUEST_LEVEL: null,
              QUEST_EXPLAIN: null,
              SECURITY: "",
              QUEST_ANSWER: "",
              examQuestionOptionList: [
                {
                  QUEST_BANK_ID: "",
                  QUEST_BANK_VERSION: "",
                  QUEST_ID: "",
                  OPTION_ITEM_LETTER: "",
                  OPTION_ITEM_CONTEXT: "",
                },
              ],
            },
          ],
        },
      },
      restTime: "", // 剩余时间
      ElapsedTime: "", // 已用时间
      Popup: false, // 控制弹出层
      finishPopup: false, // 结束考试弹出层
      testStartTime: this.toTimeFormate(new Date()), // 考试书籍开始时间
      answer: "",
      response: {
        testId: "",
        userId: "",
        startTime: "",
        endTime: "",
        testStartTime: "",
        submitTime: "",
        changeScreenTimes: "",
        testContext: [
          {
            quest_ID: "",
            quest_ANSWER: [],
            quest_SCORE: "",
            quest_TYPE: "",
            option_ITEM_LETTER: "",
          },
        ],
      }, // 考试回答答案
      questTemp: [], // 暂存题目
      insertTemp: {
        testId: "",
        userId: "",
        Temp: [
          {
            questId: "",
            questAnswer: "",
            questScore: "",
          },
        ],
      }, // 提交暂存题目到数据库
      insertAllTemp: {
        testId: "",
        userId: "",
        Temp: [
          {
            questId: "",
            questAnswer: "",
            questScore: "",
          },
        ],
      }, // 提交所有题目到数据库，防止随机
      TempPageNum: 1, // 判断用户是否点上一题
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
        if (newVal) {
          if (this.$route.query.routerPath == "onGoingTest") {
            const getTestTime = {
              url: "/GetTest/getTestTimeByEmployId",
              method: "get",
              data: {
                userId: this.employ_id,
                testId: this.$route.query.testId,
              },
            };
            http(getTestTime)
              .then((res) => {
                // console.log("getTime:", res);
                const time = res.data;
                this.restTimeStamp = this.clockToTimeStamp(time);
              })
              .then(() => {
                const ExamTestQuestList = {
                  url: "/examTest/getExamTestQuestListByEmpId",
                  method: "get",
                  data: {
                    employ_id: this.employ_id,
                    testId: this.$route.query.testId,
                  },
                };
                http(ExamTestQuestList)
                  .then((res) => {
                    this.PaperQuestionList = res.data;
                    this.total =
                      this.PaperQuestionList.exam_paper.examQuestionList.length;
                    console.log("通过进行中进入", this.PaperQuestionList);
                    if (this.PaperQuestionList.TEST_TIME == null) {
                      this.testTimeType = "Y";
                    }
                    // 处理字符串转时间
                    this.startTime = new Date(
                      Date.parse(
                        this.PaperQuestionList.START_TIME.replace(/-/g, "/")
                      )
                    );
                    this.endTime = new Date(
                      Date.parse(
                        this.PaperQuestionList.END_TIME.replace(/-/g, "/")
                      )
                    );
                    // 动态生成键值
                    this.response.testId = this.PaperQuestionList.TEST_ID;
                    this.response.startTime = this.PaperQuestionList.START_TIME;
                    this.response.endTime = this.PaperQuestionList.END_TIME;
                    this.response.testStartTime = this.testStartTime;
                    this.response.userId = this.userId;
                    // console.log(this.PaperQuestionList)
                    this.response.testContext = [];
                    this.insertAllTemp.Temp = [];
                    // 遍历
                    this.PaperQuestionList.exam_paper.examQuestionList.forEach(
                      (item) => {
                        if (item.QUEST_TYPE == "填空题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: new Array(
                              item.examQuestionOptionList.length
                            ),
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          // this.response.testContext.quset_ANSWER.from(null,{length: item.examQuestionOptionList.length})
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: new Array(
                              item.examQuestionOptionList.length
                            ),
                            questScore: item.QUEST_SCORE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: new Array(
                              item.examQuestionOptionList.length
                            ),
                            flag: 0,
                          });
                          // (null,{length: item.examQuestionOptionList.length})
                          this.fillingCount++;
                        } else if (item.QUEST_TYPE == "多选题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: [],
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: [],
                            questScore: item.QUEST_SCORE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: [],
                            flag: 0,
                          });
                          this.multipleSelectCount++;
                        } else if (item.QUEST_TYPE == "单选题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            flag: 0,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: "",
                            questScore: item.QUEST_SCORE,
                          });
                          this.singleSelectCount++;
                        } else {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            flag: 0,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: "",
                            questScore: item.QUEST_SCORE,
                          });
                          this.judgeCount++;
                        }
                      }
                    );
                    const userId = this.employ_id;
                    const TEST_ID = this.$route.query.testId;
                    // 暂存题目
                    this.countinueGetTemp(userId, TEST_ID);
                  })
                  .then(() => {
                    if (this.timer) clearInterval(this.timer);
                    this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
                  });
              });
            // 正常考试
          } else {
            // 插入进行中考试记录
            const onGoingConfig = {
              url: "GetTest/havingOngoingForPc",
              method: "get",
              data: {
                employ_id: this.employ_id,
              },
            };
            // 判断是否有进行中的考试
            http(onGoingConfig)
              .then((res) => {
                if (res.data == 0) {
                  // 将本考试id加入进行中
                  const obj = {
                    testId: this.$route.query.testId,
                    userId: this.employ_id,
                    testStartTime: this.toTimeFormate(new Date()),
                  };
                  const insertOnGoing = {
                    url: "PostTest/addToOnGoingByEmployId",
                    method: "post",
                    data: obj,
                  };

                  // 插入到进行中考试
                  http(insertOnGoing);
                }
              })
              .then(() => {
                console.log("正常进行");
                const ExamTestQuestList = {
                  url: "/examTest/getExamTestQuestListByEmpId",
                  method: "get",
                  data: {
                    employ_id: this.employ_id,
                    testId: this.$route.query.testId,
                  },
                };
                http(ExamTestQuestList)
                  .then((res) => {
                    this.PaperQuestionList = res.data;
                    this.total =
                      this.PaperQuestionList.exam_paper.examQuestionList.length;
                    console.log("除进行中进入", this.PaperQuestionList);
                    console.log(res.data);
                    if (this.PaperQuestionList.TEST_TIME == null) {
                      this.testTimeType = "Y";
                    }
                    // 处理字符串转时间
                    this.startTime = new Date(
                      Date.parse(
                        this.PaperQuestionList.START_TIME.replace(/-/g, "/")
                      )
                    );
                    this.endTime = new Date(
                      Date.parse(
                        this.PaperQuestionList.END_TIME.replace(/-/g, "/")
                      )
                    );
                    // 动态生成键值
                    this.response.testId = this.PaperQuestionList.TEST_ID;
                    this.response.startTime = this.PaperQuestionList.START_TIME;
                    this.response.endTime = this.PaperQuestionList.END_TIME;
                    this.response.testStartTime = this.testStartTime;
                    this.response.userId = this.userId;
                    // console.log(this.PaperQuestionList)
                    this.response.testContext = [];
                    this.insertAllTemp.Temp = [];
                    // 遍历
                    this.PaperQuestionList.exam_paper.examQuestionList.forEach(
                      (item) => {
                        if (item.QUEST_TYPE == "填空题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: new Array(
                              item.examQuestionOptionList.length
                            ),
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          // this.response.testContext.quset_ANSWER.from(null,{length: item.examQuestionOptionList.length})
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: new Array(
                              item.examQuestionOptionList.length
                            ),
                            questScore: item.QUEST_SCORE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: new Array(
                              item.examQuestionOptionList.length
                            ),
                            flag: 0,
                          });
                          // (null,{length: item.examQuestionOptionList.length})
                          this.fillingCount++;
                        } else if (item.QUEST_TYPE == "多选题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: [],
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: [],
                            questScore: item.QUEST_SCORE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: [],
                            flag: 0,
                          });
                          this.multipleSelectCount++;
                        } else if (item.QUEST_TYPE == "单选题") {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            flag: 0,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: "",
                            questScore: item.QUEST_SCORE,
                          });
                          this.singleSelectCount++;
                        } else {
                          this.response.testContext.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            quest_SCORE: item.QUEST_SCORE,
                            quest_TYPE: item.QUEST_TYPE,
                          });
                          this.answerContent.push({
                            quest_ID: item.QUEST_ID,
                            quest_ANSWER: "",
                            flag: 0,
                          });
                          this.insertAllTemp.Temp.push({
                            questId: item.QUEST_ID,
                            questAnswer: "",
                            questScore: item.QUEST_SCORE,
                          });
                          this.judgeCount++;
                        }
                      }
                    );
                    const userId = this.employ_id;
                    const TEST_ID = this.$route.query.testId;
                    // 暂存题目
                    this.countinueGetTemp(userId, TEST_ID);
                  })
                  .then(() => {
                    // 判断TEST_TIME有没有记录
                    if (this.PaperQuestionList.TEST_TIME == null) {
                      // 每题分开算
                      // 填空题时间
                      const fillingTime =
                        this.secondToMinute(
                          this.PaperQuestionList.TEST_TIME_CLOZE
                        ) * this.fillingCount;
                      // 多选
                      const multipleTime =
                        this.secondToMinute(
                          this.PaperQuestionList.TEST_TIME_M_CHOICE
                        ) * this.multipleSelectCount;
                      // 单选
                      const singleTime =
                        this.secondToMinute(
                          this.PaperQuestionList.TEST_TIME_S_CHOICE
                        ) * this.singleSelectCount;
                      // 判断
                      const judgeTime =
                        this.secondToMinute(
                          this.PaperQuestionList.TEST_TIME_JUDGE
                        ) * this.judgeCount;
                      this.restTimeMinutes =
                        fillingTime + multipleTime + singleTime + judgeTime;
                      console.log("每题总时间:", this.restTimeMinutes);
                      const updateTestTime = {
                        url: "/GetTest/updateTestTimeByEmployId",
                        method: "get",
                        data: {
                          userId: this.employ_id,
                          testId: this.$route.query.testId,
                          TEST_TIME: this.restTimeMinutes,
                        },
                      };
                      // 将时间更新到暂存
                      http(updateTestTime).then((res) => {
                        console.log("updateTime:", res.code);
                      });
                      this.restTimeStamp = this.clockToTimeStamp(
                        this.restTimeMinutes
                      );
                      if (this.timer) clearInterval(this.timer);
                      this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
                    } else {
                      this.restTimeMinutes = this.PaperQuestionList.TEST_TIME;
                      const updateTestTime = {
                        url: "/GetTest/updateTestTimeByEmployId",
                        method: "get",
                        data: {
                          userId: this.employ_id,
                          testId: this.$route.query.testId,
                          TEST_TIME: this.restTimeMinutes,
                        },
                      };
                      // 将时间更新到暂存
                      http(updateTestTime).then((res) => {
                        console.log("updateTime:", res.code);
                      });
                      this.restTimeStamp = this.clockToTimeStamp(
                        this.restTimeMinutes
                      );
                      if (this.timer) clearInterval(this.timer);
                      this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
                    }
                  });
              });
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 结束考试
    submitFinishTest() {
      // 判断是否全部答题
      if (
        this.havaAnswerCount ==
        this.PaperQuestionList.exam_paper.examQuestionList.length
      ) {
        this.submitTestMethod();
      } else {
        // 未全部答案
        this.$confirm("未全部答完题目，是否结束考试？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.submitTestMethod();
          })
          .catch(() => {
            this.$toast.fail("已取消!");
          });
      }
      this.finishPopup = false;
    },
    // 取消结束考试
    cancelFinishTest() {
      this.finishPopup = false;
    },
    // 显示结束考试界面
    showFinishTest() {
      this.havaAnswerCount = 0;
      const that = this;
      this.answerContent = [];
      this.response.testContext.forEach((item) => {
        this.answerContent.push({
          quest_ID: item.quest_ID,
          quest_ANSWER: item.quest_ANSWER,
          flag: 0,
        });
      });
      // 判断flag是否为0，是0++，不为0不操作
      that.answerContent.forEach((item) => {
        if (item.quest_ANSWER.toString().replace(/,/g, "").length > 0) {
          this.havaAnswerCount++;
          item.flag = 1;
        } else {
          item.flag = 0;
        }
      });
      // 点击提交考试前，把最后一题提交暂存表
      this.submitLastTemp();
      // 更新题到暂存表
      // this.PaginationChange();
      this.ElapsedTime = this.toHHmmss(
        this.$moment(new Date()).diff(this.$moment(this.startTime))
      );
      this.userInfo =
        this.$store.getters.userInfo.name +
        "-" +
        this.$store.getters.userInfo.employ_id;
      this.finishPopup = true;
    },
    // 分页跳转
    PaginationChange() {
      if (this.testTimeType == "Y") {
        if (this.pageNum > this.nonPageNum) {
          this.havaAnswerCount = 0;
          const that = this;
          this.answerContent = [];
          this.response.testContext.forEach((item) => {
            this.answerContent.push({
              quest_ID: item.quest_ID,
              quest_ANSWER: item.quest_ANSWER,
              flag: 0,
            });
          });
          // 判断flag是否为0，是0++，不为0不操作
          that.answerContent.forEach((item) => {
            if (item.quest_ANSWER.toString().replace(/,/g, "").length > 0) {
              this.havaAnswerCount++;
              item.flag = 1;
            } else {
              item.flag = 0;
            }
          });
          if (this.pageNum == 1 && this.nonPageNum == 2) {
            this.pageNum = this.nonPageNum;
            this.$message.success("禁止点击上一题！");
            return;
          }
          this.nonPageNum = this.pageNum;
          this.goTonextTime = 0;
          if (
            this.PaperQuestionList.exam_paper.examQuestionList[this.pageNum - 1]
              .QUEST_TYPE == "单选题"
          ) {
            this.goTonextRestTime = this.PaperQuestionList.TEST_TIME_S_CHOICE;
          } else if (
            this.PaperQuestionList.exam_paper.examQuestionList[this.pageNum - 1]
              .QUEST_TYPE == "多选题"
          ) {
            this.goTonextRestTime = this.PaperQuestionList.TEST_TIME_M_CHOICE;
          } else {
            this.goTonextRestTime = this.PaperQuestionList.TEST_TIME_CLOZE;
          }
          // 提交暂存
          this.submitTemp();
        } else {
          this.pageNum = this.nonPageNum;
          this.$message.success("禁止点击上一题！");
          return;
        }
      } else {
        // 更新剩余考试时间到数据库
        this.restTimeMinutes = this.timeStampToClock(this.restTimeStamp);
        const updateTestTime = {
          url: "/GetTest/updateTestTimeByEmployId",
          method: "get",
          data: {
            userId: this.employ_id,
            testId: this.$route.query.testId,
            TEST_TIME: this.restTimeMinutes,
          },
        };
        // 将时间更新到暂存
        http(updateTestTime);
        this.havaAnswerCount = 0;
        const that = this;
        this.answerContent = [];
        this.response.testContext.forEach((item) => {
          this.answerContent.push({
            quest_ID: item.quest_ID,
            quest_ANSWER: item.quest_ANSWER,
            flag: 0,
          });
        });
        // 判断flag是否为0，是0++，不为0不操作
        that.answerContent.forEach((item) => {
          if (item.quest_ANSWER.toString().replace(/,/g, "").length > 0) {
            this.havaAnswerCount++;
            item.flag = 1;
          } else {
            item.flag = 0;
          }
        });
        // 判断是否点击下一题
        if (this.pageNum > this.TempPageNum) {
          if (this.pageNum == 1 && this.TempPageNum == 2) {
            this.TempPageNum = this.pageNum;
          } else {
            this.TempPageNum = this.pageNum;
            // 初始化
            this.insertTemp.Temp = [];
            this.insertTemp.Temp.push({
              questId: this.response.testContext[this.pageNum - 2].quest_ID,
              questAnswer:
                this.response.testContext[this.pageNum - 2].quest_ANSWER,
              questScore:
                this.response.testContext[this.pageNum - 2].quest_SCORE,
            });
            // 处理多选题、填空题数据
            this.insertTemp.Temp.forEach((item) => {
              // 多选题
              if (item.questAnswer instanceof Array) {
                item.questAnswer = item.questAnswer.join(",");
              }
            });
            // 提交数据到后端
            this.insertTemp.userId = this.employ_id;
            this.insertTemp.testId = this.$route.query.testId;
            const insertQuestTemp = {
              url: "/PostTest/insertQuestTempByEmployId",
              method: "post",
              data: this.insertTemp,
            };
            http(insertQuestTemp);
            // 提交结束清空数组
            this.insertTemp = {
              testId: "",
              Temp: [
                {
                  questId: "",
                  questAnswer: "",
                  questScore: "",
                },
              ],
            };
          }
        } else {
          this.TempPageNum = this.pageNum;
        }
      }
    },
    // 显示目录
    showMenu() {
      this.centerDialogVisible = true;
    },
    // 题目跳转
    jumpToQuestion(index) {
      this.centerDialogVisible = false;
      if (this.testTimeType == "N") {
        this.pageNum = index + 1;
      }
    },
    // 获取题目信息
    getExamTestQuestList() {
      const ExamTestQuestList = {
        url: "/examTest/getExamTestQuestListByEmpId",
        method: "get",
        data: {
          employ_id: this.employ_id,
          testId: this.$route.query.testId,
        },
      };
      http(ExamTestQuestList).then((res) => {
        this.PaperQuestionList = res.data;
        console.log(res.data);
        if (this.PaperQuestionList.TEST_TIME == null) {
          this.testTimeType = "Y";
        }
        // 处理字符串转时间
        this.startTime = new Date(
          Date.parse(this.PaperQuestionList.START_TIME.replace(/-/g, "/"))
        );
        this.endTime = new Date(
          Date.parse(this.PaperQuestionList.END_TIME.replace(/-/g, "/"))
        );
        // 动态生成键值
        this.response.testId = this.PaperQuestionList.TEST_ID;
        this.response.startTime = this.PaperQuestionList.START_TIME;
        this.response.endTime = this.PaperQuestionList.END_TIME;
        this.response.testStartTime = this.testStartTime;
        this.response.userId = this.userId;
        // console.log(this.PaperQuestionList)
        this.response.testContext = [];
        this.insertAllTemp.Temp = [];
        // 遍历
        this.PaperQuestionList.exam_paper.examQuestionList.forEach((item) => {
          if (item.QUEST_TYPE == "填空题") {
            this.response.testContext.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: new Array(item.examQuestionOptionList.length),
              quest_SCORE: item.QUEST_SCORE,
              quest_TYPE: item.QUEST_TYPE,
            });
            // this.response.testContext.quset_ANSWER.from(null,{length: item.examQuestionOptionList.length})
            this.insertAllTemp.Temp.push({
              questId: item.QUEST_ID,
              questAnswer: new Array(item.examQuestionOptionList.length),
              questScore: item.QUEST_SCORE,
            });
            this.answerContent.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: new Array(item.examQuestionOptionList.length),
              flag: 0,
            });
            this.fillingCount++;
          } else if (item.QUEST_TYPE == "多选题") {
            this.response.testContext.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: [],
              quest_SCORE: item.QUEST_SCORE,
              quest_TYPE: item.QUEST_TYPE,
            });
            this.insertAllTemp.Temp.push({
              questId: item.QUEST_ID,
              questAnswer: [],
              questScore: item.QUEST_SCORE,
            });
            this.answerContent.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: [],
              flag: 0,
            });
            this.multipleSelectCount++;
          } else {
            this.response.testContext.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: "",
              quest_SCORE: item.QUEST_SCORE,
              quest_TYPE: item.QUEST_TYPE,
            });
            this.answerContent.push({
              quest_ID: item.QUEST_ID,
              quest_ANSWER: "",
              flag: 0,
            });
            this.insertAllTemp.Temp.push({
              questId: item.QUEST_ID,
              questAnswer: "",
              questScore: item.QUEST_SCORE,
            });
            this.singleSelectCount++;
          }
        });
        const userId = this.employ_id;
        const TEST_ID = this.$route.query.testId;
        // 暂存题目
        this.countinueGetTemp(userId, TEST_ID);
      });
    },
    // 继续考试的时候将暂存表数据获取赋值
    countinueGetTemp(userId, TEST_ID) {
      new Promise((resolve, reject) => {
        const countinueGetTemp = {
          url: "GetTest/countinueGetTempByEmployId",
          method: "get",
          data: {
            userId: userId,
            testId: TEST_ID,
          },
        };
        http(countinueGetTemp)
          .then((res) => {
            this.questTemp = res.data;
            this.response.testContext.forEach((item) => {
              this.questTemp.forEach((answer) => {
                // 判断是否是多选和判断
                if (
                  item.quest_TYPE == "多选题" ||
                  item.quest_TYPE == "填空题"
                ) {
                  if (item.quest_ID == answer.questId) {
                    item.quest_ANSWER = answer.questAnswer.split(",");
                    if (
                      item.quest_ANSWER.toString().replace(/,/g, "").length > 0
                    ) {
                      this.havaAnswerCount++;
                    }
                  }
                } else {
                  if (item.quest_ID == answer.questId) {
                    item.quest_ANSWER = answer.questAnswer;
                    if (
                      item.quest_ANSWER.toString().replace(/,/g, "").length > 0
                    ) {
                      this.havaAnswerCount++;
                    }
                  }
                }
              });
            });
            //
            // 处理答题数
            this.response.testContext.forEach((item) => {
              this.answerContent.forEach((count) => {
                if (item.quest_ID == count.quest_ID) {
                  count.quest_ANSWER = item.quest_ANSWER;
                  count.flag = 1;
                }
              });
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
        //
        // 插入所有题目
        // 处理多选题、填空题数据
        this.insertAllTemp.Temp.forEach((item) => {
          // 多选题 填空
          if (item.questAnswer instanceof Array) {
            item.questAnswer = item.questAnswer.join(",");
          }
        });
        // 提交数据到后端
        this.insertAllTemp.userId = this.employ_id;
        this.insertAllTemp.testId = this.$route.query.testId;
      });
      // 判断暂存表是否有该人员的该场考试记录，无则插入
      const getContextTemp = {
        url: "GetTest/getContextTempByEmployId",
        method: "get",
        data: {
          userId: this.employ_id,
          testId: this.$route.query.testId,
        },
      };
      http(getContextTemp).then((res) => {
        console.log("getTemp", res.code);
        if (res.data.length == 0) {
          const insertAllQuestTemp = {
            url: "/PostTest/insertAllQuestTempByEmployId",
            method: "post",
            data: this.insertAllTemp,
          };
          http(insertAllQuestTemp);
        }
      });
      // 提交结束清空数组
      this.insertTemp = {
        testId: "",
        Temp: [
          {
            questId: "",
            questAnswer: "",
            questScore: "",
          },
        ],
      };
    },
    //
    // 秒转分钟
    secondToMinute(data) {
      let s = "";
      s = parseFloat((data / 60).toString()).toFixed(2);
      return s;
    },
    // 时分秒转时间戳
    toTimeStamp(date) {
      var s = "";
      var hour = date.split(":")[0];
      var min = date.split(":")[1];
      var sec = date.split(":")[2];
      s = Number(hour * 3600) + Number(min * 60) + Number(sec);
      s = s * 1000;
      return s;
    },
    // 时间转YYYMMDD-hhmmss
    toTimeFormate(date) {
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 - 0 >= 10
          ? Number(date.getMonth()) + 1
          : "0" + (Number(date.getMonth()) + 1);
      let D = date.getDate();
      let h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      let m =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    },
    // 时间戳转时分秒
    toHHmmss(data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (data % (1000 * 60)) / 1000;
      s =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      if (s.length > 8) {
        s = s.slice(0, 8);
      }
      return s;
    },
    // 分钟转时间戳
    clockToTimeStamp(clock) {
      var s = "";
      s = Number(clock * 60) * 1000;
      return s;
    },
    // 时间戳转分钟
    timeStampToClock(data) {
      var s = "";
      s = data / 1000 / 60;
      return s;
    },
    // 提交最后一题暂存
    submitLastTemp() {
      // 初始化
      this.insertTemp.Temp = [];
      this.insertTemp.Temp.push({
        questId:
          this.response.testContext[
            this.PaperQuestionList.exam_paper.examQuestionList.length - 1
          ].quest_ID,
        questAnswer:
          this.response.testContext[
            this.PaperQuestionList.exam_paper.examQuestionList.length - 1
          ].quest_ANSWER,
        questScore:
          this.response.testContext[
            this.PaperQuestionList.exam_paper.examQuestionList.length - 1
          ].quest_SCORE,
      });
      // 处理多选题、填空题数据
      this.insertTemp.Temp.forEach((item) => {
        // 多选题
        if (item.questAnswer instanceof Array) {
          item.questAnswer = item.questAnswer.join(",");
        }
      });
      // 提交数据到后端
      this.insertTemp.userId = this.employ_id;
      this.insertTemp.testId = this.$route.query.testId;
      const insertQuestTemp = {
        url: "/PostTest/insertQuestTempByEmployId",
        method: "post",
        data: this.insertTemp,
      };
      http(insertQuestTemp).then((res) => {
        console.log("insertTemp", res.code);
      });
      // 提交结束清空数组
      this.insertTemp = {
        testId: "",
        Temp: [
          {
            questId: "",
            questAnswer: "",
            questScore: "",
          },
        ],
      };
    },
    // 封装提交考试方法
    submitTestMethod() {
      // 设置提交时间
      this.response.submitTime = this.toTimeFormate(new Date());
      // 判断是否为多选题，多选题转为String类型
      this.response.testContext.forEach((item) => {
        // 多选题，填空题
        if (item.quest_ANSWER instanceof Array == true) {
          item.quest_ANSWER = item.quest_ANSWER.join(",");
        }
      });
      this.response.testId = this.$route.query.testId;
      this.response.userId = this.employ_id;
      const submitTest = {
        url: "/PostTest/submitTestByEmployId",
        method: "post",
        data: this.response,
      };
      http(submitTest).then(() => {
        this.$message.success("提交成功！");
      });
      // 跳转页面
      this.$router.push({
        path: "/testCenter/noBeginTest",
      });
    },
    // 定时器，倒计时，当倒计时结束后自动交卷
    AutoSubmitPaperTest() {
      // 调用moment插件计算时间差
      // const time = this.$moment(this.endTime).diff(this.$moment(new Date())) //时间类型time
      // 赋值转时分秒
      if (this.testTimeType == "Y") {
        this.restTime = this.toHHmmss(this.restTimeStamp); // 字符串类型this.restTime
        // 转时间戳
        let timeStamp = this.restTime; // timeStamp字符串类型
        timeStamp = this.toTimeStamp(timeStamp);
        // 判断时间戳是否大于等于0
        if (timeStamp >= 1000) {
          this.restTimeStamp = this.restTimeStamp - 1000;
          timeStamp = this.restTimeStamp;
          // 判断是否在倒二题
          if (
            this.pageNum <
            this.PaperQuestionList.exam_paper.examQuestionList.length
          ) {
            // 判断题型
            if (
              this.PaperQuestionList.exam_paper.examQuestionList[
                this.pageNum - 1
              ].QUEST_TYPE == "单选题"
            ) {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_S_CHOICE -
                this.goTonextTime -
                1;
              this.goTonextTime++;
              if (
                this.goTonextTime == this.PaperQuestionList.TEST_TIME_S_CHOICE
              ) {
                this.pageNum++;
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "单选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_S_CHOICE;
                } else if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "多选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_M_CHOICE;
                } else {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_CLOZE;
                }
                this.submitTemp();
              }
            } else if (
              this.PaperQuestionList.exam_paper.examQuestionList[
                this.pageNum - 1
              ].QUEST_TYPE == "多选题"
            ) {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_M_CHOICE -
                this.goTonextTime -
                1;
              this.goTonextTime++;
              if (
                this.goTonextTime == this.PaperQuestionList.TEST_TIME_M_CHOICE
              ) {
                this.pageNum++;
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "单选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_S_CHOICE;
                } else if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "多选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_M_CHOICE;
                } else {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_CLOZE;
                }
                this.submitTemp();
              }
            } else {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_CLOZE - this.goTonextTime - 1;
              this.goTonextTime++;
              if (this.goTonextTime == this.PaperQuestionList.TEST_TIME_CLOZE) {
                this.pageNum++;
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "单选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_S_CHOICE;
                } else if (
                  this.PaperQuestionList.exam_paper.examQuestionList[
                    this.pageNum - 1
                  ].QUEST_TYPE == "多选题"
                ) {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_M_CHOICE;
                } else {
                  this.goTonextRestTime =
                    this.PaperQuestionList.TEST_TIME_CLOZE;
                }
                this.submitTemp();
              }
            }
          } else {
            if (
              this.PaperQuestionList.exam_paper.examQuestionList[
                this.pageNum - 1
              ].QUEST_TYPE == "单选题"
            ) {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_S_CHOICE -
                this.goTonextTime -
                1;
              this.goTonextTime++;
              if (
                this.goTonextTime == this.PaperQuestionList.TEST_TIME_S_CHOICE
              ) {
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                this.goTonextRestTime = 0;
                this.restTime = "00:00:00";
                this.submitTemp();
                clearInterval(this.timer);
                this.submitTestMethod();
                // alert("自动提交考试")
                this.$toast.success("自动提交考试");
              }
            } else if (
              this.PaperQuestionList.exam_paper.examQuestionList[
                this.pageNum - 1
              ].QUEST_TYPE == "多选题"
            ) {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_M_CHOICE -
                this.goTonextTime -
                1;
              this.goTonextTime++;
              if (
                this.goTonextTime == this.PaperQuestionList.TEST_TIME_M_CHOICE
              ) {
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                this.goTonextRestTime = 0;
                this.restTime = "00:00:00";
                this.submitTemp();
                clearInterval(this.timer);
                this.submitTestMethod();
                // alert("自动提交考试")
                this.$toast.success("自动提交考试");
              }
            } else {
              this.goTonextRestTime =
                this.PaperQuestionList.TEST_TIME_CLOZE - this.goTonextTime - 1;
              this.goTonextTime++;
              if (this.goTonextTime == this.PaperQuestionList.TEST_TIME_CLOZE) {
                this.nonPageNum = this.pageNum;
                this.goTonextTime = 0;
                this.goTonextRestTime = 0;
                this.restTime = "00:00:00";
                this.submitTemp();
                clearInterval(this.timer);
                this.submitTestMethod();
                // alert("自动提交考试")
                this.$toast.success("自动提交考试");
              }
            }
          }
        } else {
          this.restTime = "00:00:00";
          clearInterval(this.timer);
          this.submitTestMethod();
          // alert("自动提交考试")
          this.$toast.success("自动提交考试");
        }
        this.restTime = this.toHHmmss(timeStamp);
      } else {
        this.restTime = this.toHHmmss(this.restTimeStamp); // 字符串类型this.restTime
        // 转时间戳
        let timeStamp = this.restTime; // timeStamp字符串类型
        timeStamp = this.toTimeStamp(timeStamp);
        // 判断时间戳是否大于等于0
        if (timeStamp >= 1000) {
          this.restTimeStamp = this.restTimeStamp - 1000;
          timeStamp = this.restTimeStamp;
        } else {
          this.restTime = "00:00:00";
          clearInterval(this.timer);
          this.submitTestMethod();
          // alert("自动提交考试")
          this.$toast.success("自动提交考试");
        }
        this.restTime = this.toHHmmss(timeStamp);
      }
    },
    // 提交暂存
    submitTemp() {
      // 更新剩余考试时间到数据库
      this.restTimeMinutes = this.timeStampToClock(this.restTimeStamp);
      const updateTestTime = {
        url: "/GetTest/updateTestTimeByEmployId",
        method: "get",
        data: {
          userId: this.employ_id,
          testId: this.$route.query.testId,
          TEST_TIME: this.restTimeMinutes,
        },
      };
      http(updateTestTime).then((res) => {
        console.log("updateTime", res.code);
      });
      this.havaAnswerCount = 0;
      const that = this;
      this.answerContent = [];
      this.response.testContext.forEach((item) => {
        this.answerContent.push({
          quest_ID: item.quest_ID,
          quest_ANSWER: item.quest_ANSWER,
          flag: 0,
        });
      });
      // 判断flag是否为0，是0++，不为0不操作
      that.answerContent.forEach((item) => {
        if (item.quest_ANSWER.toString().replace(/,/g, "").length > 0) {
          this.havaAnswerCount++;
          item.flag = 1;
        } else {
          item.flag = 0;
        }
      });

      // 初始化
      this.insertTemp.Temp = [];
      this.insertTemp.Temp.push({
        questId: this.response.testContext[this.pageNum - 2].quest_ID,
        questAnswer: this.response.testContext[this.pageNum - 2].quest_ANSWER,
        questScore: this.response.testContext[this.pageNum - 2].quest_SCORE,
      });
      // 处理多选题、填空题数据
      this.insertTemp.Temp.forEach((item) => {
        // 多选题
        if (item.questAnswer instanceof Array) {
          item.questAnswer = item.questAnswer.join(",");
        }
      });
      // 提交数据到后端
      this.insertTemp.userId = this.employ_id;
      this.insertTemp.testId = this.$route.query.testId;
      const insertQuestTemp = {
        url: "/PostTest/insertQuestTempByEmployId",
        method: "post",
        data: this.insertTemp,
      };
      http(insertQuestTemp).then((res) => {
        console.log("iTemp", res.code);
      });
      // 提交结束清空数组
      this.insertTemp = {
        testId: "",
        userId: "",
        Temp: [
          {
            questId: "",
            questAnswer: "",
            questScore: "",
          },
        ],
      };
    },
    //
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.testView {
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
.pub_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
.pub_dialog >>> .el-dialog {
  margin: 0 auto !important;
  height: 50%;
  overflow: hidden;
}
.pub_dialog >>> .el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  padding: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: auto;
}
</style>
