<template>
  <!--  考试内容  -->
  <div id="testView">
    <div id="header">
      <!-- 头部 -->
      <van-row
        type="flex"
        align="center"
        style="background-color: #f2f2f2; height: 50px"
      >
        <van-col span="8"></van-col>
        <van-col span="8">
          <div v-if="testTimeType == 'N'">
            剩余时间:
            <div>{{ restTime }}</div>
          </div>
          <div v-else>
            本题剩余时间:
            <div>{{ goTonextRestTime }} 秒</div>
          </div>
        </van-col>
        <van-col span="8" @click="showFinishPopup"
          ><van-button
            type="danger"
            size="small"
            id="finishTestButton"
            v-if="pageNum == pageTotal"
            >结束考试</van-button
          ></van-col
        >
      </van-row>
      <van-row
        gutter="20"
        align="center"
        style="
          height: 40px;
          line-height: 40px;
          background-color: #f2f2f2;
          border-top: gray solid 0.5px;
        "
      >
        <van-col span="8"
          >及格线:{{
            this.PaperQuestionList.exam_paper.PASSING_GRADE
          }}分</van-col
        >
        <van-col span="8" class="menu_btn"
          ><van-button
            size="mini"
            type="primary"
            round
            style="width: 40px"
            @click="showMenu"
            >目录</van-button
          ></van-col
        >
        <van-col span="8"
          >{{ pageNum }}/{{
            this.PaperQuestionList.exam_paper.examQuestionList.length
          }}</van-col
        > </van-row
      ><br />
    </div>
    <!-- 考试内容页面-->
    <div id="main" v-if="PaperQuestionList.length !=0">
      <!--  单选题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '单选题'
        "
      >
        <van-row type="flex">
          <van-col span="6"><span class="item_key">单选题</span></van-col>
          <van-col span="8"
            >第{{ pageNum }}题({{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</van-col
          >
          <van-col span="10"></van-col>
        </van-row>

        <van-row type="flex">
          <van-col span="24" class="item_content_title">{{
            this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
              .QUEST_CONTEXT
          }}</van-col>
        </van-row>

        <van-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
        >
          <van-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            span="22"
            offset="1"
            class="CheckChoice"
            :key="index"
          >
            <van-radio :name="item.OPTION_ITEM_LETTER" :key="index"
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</van-radio
            >
          </van-col>
        </van-radio-group>
      </div>

      <!--            多选题-->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '多选题'
        "
      >
        <van-row type="flex">
          <van-col span="6"><span class="item_key">多选题</span></van-col>
          <van-col span="8"
            >第{{ pageNum }}题({{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</van-col
          >
          <van-col span="10"></van-col>
        </van-row>

        <van-row type="flex">
          <van-col span="24" class="item_content_title">{{
            this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
              .QUEST_CONTEXT
          }}</van-col>
        </van-row>
        <van-checkbox-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
        >
          <van-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            span="22"
            offset="1"
            class="CheckChoice"
            :key="index"
          >
            <van-checkbox :name="item.OPTION_ITEM_LETTER" :key="index"
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</van-checkbox
            >
          </van-col>
        </van-checkbox-group>
      </div>

      <!--判断题-->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '判断题'
        "
      >
        <van-row type="flex">
          <van-col span="6"><span class="item_key">判断题</span></van-col>
          <van-col span="8"
            >第{{ pageNum }}题({{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</van-col
          >
          <van-col span="10"></van-col>
        </van-row>

        <van-row type="flex">
          <van-col span="24" class="item_content_title">{{
            this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
              .QUEST_CONTEXT
          }}</van-col>
        </van-row>

        <van-radio-group
          v-model="response.testContext[pageNum - 1].quest_ANSWER"
        >
          <van-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            span="22"
            offset="1"
            class="CheckChoice"
            :key="index"
          >
            <van-radio :name="item.OPTION_ITEM_LETTER" :key="index"
              >{{ item.OPTION_ITEM_LETTER }}.{{
                item.OPTION_ITEM_CONTEXT
              }}</van-radio
            >
          </van-col>
          <!--                    <van-col span="22" offset="1" class="CheckChoice"><van-radio name="error">{{this.PaperQuestionList[0].data[0].exam_paper[0].examQuestionList[pageNum-1].examQuestionOptionList[1].option_ITEM_CONTEXT}}</van-radio></van-col>-->
        </van-radio-group>
      </div>

      <!--  填空题 -->
      <div
        v-if="
          this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
            .QUEST_TYPE == '填空题'
        "
        id="field"
      >
        <van-row type="flex">
          <van-col span="6"><span class="item_key">填空题</span></van-col>
          <van-col span="8"
            >第{{ pageNum }}题({{
              this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
                .QUEST_SCORE
            }}分)</van-col
          >
          <van-col span="10"></van-col>
        </van-row>

        <van-row type="flex">
          <van-col span="24" class="item_content_title test">{{
            this.PaperQuestionList.exam_paper.examQuestionList[pageNum - 1]
              .QUEST_CONTEXT
          }}</van-col>
        </van-row>

        <van-checkbox-group id="questField" class="theCheckbox">
          <van-col
            v-for="(item, index) in PaperQuestionList.exam_paper
              .examQuestionList[pageNum - 1].examQuestionOptionList"
            span="22"
            offset="1"
            class="CheckChoice"
            :key="index"
          >
            <van-field
              v-model="response.testContext[pageNum - 1].quest_ANSWER[index]"
              :label="item.OPTION_ITEM_LETTER + '.'"
            ></van-field>
          </van-col>
        </van-checkbox-group>
        <van-row type="flex">
          <van-col span="24"></van-col>
        </van-row>
      </div>
    </div>
    <!--        显示是否答题和题目跳转-->
    <!--        style="background-color: rgba(255,0,19,0.56);"-->
    <div id="Popup">
      <van-popup v-model="Popup" position="top">
        <van-button
          size="small"
          class="main_Popup"
          style="padding: 2px; margin: 2px 4px"
          v-for="(item, index) in PaperQuestionList.exam_paper.examQuestionList"
          @click="jumpToQuestion(index)"
          :key="index"
        >
          <span
            v-if="
              response.testContext[index].quest_ANSWER
                .toString()
                .replace(/,/g, '').length == 0
            "
            >题目{{ index + 1 }} 未答</span
          >
          <span v-else style="background-color: red"
            >题目{{ index + 1 }} 已答</span
          >
        </van-button>
      </van-popup>
    </div>
    <!--        当选择结束考试的时候-->
    <div id="finishPopup">
      <van-popup v-model="finishPopup" style="width: 70%; height: 50%">
        <van-cell-group>
          <van-cell
            title="结束考试"
            style="font-size: large; font-weight: bold"
            size="large"
          ></van-cell>
          <div style="position: relative; right: 25px">
            <van-cell title="答题人:">{{ userInfo }}</van-cell>
            <van-cell title="答题数:"
              >{{ havaAnswerCount }}/{{
                PaperQuestionList.exam_paper.examQuestionList.length
              }}</van-cell
            >
            <van-cell title="考试时长:">{{ ElapsedTime }}</van-cell>
            <van-cell title="考试名称:">{{
              PaperQuestionList.TEST_NAME
            }}</van-cell>
          </div>
        </van-cell-group>
        <van-button
          style="
            position: relative;
            background-color: dodgerblue;
            color: #f2f2f2;
            width: 80px;
            right: 20px;
            top: 30px;
          "
          round
          @click="submitFinishTest"
          >确定</van-button
        >
        <van-button
          type="primary"
          style="
            position: relative;
            color: #f2f2f2;
            width: 80px;
            left: 20px;
            top: 30px;
          "
          round
          @click="cancelFinishTest"
          >取消</van-button
        >
      </van-popup>
    </div>
    <!-- 底部 -->
    <div id="footer">
      <!--分页-->
      <van-pagination
        v-model="pageNum"
        :page-count="this.PaperQuestionList.exam_paper.examQuestionList.length"
        show-page-size="1"
        id="Pagination"
        @change="PaginationChange"
        mode="simple"
      >
        <template #prev-text> 上一题 </template>
        <template #next-text> 下一题 </template>
      </van-pagination>
    </div>
  </div>
</template>

<script>
import {
  countinueGetTemp,
  deleteQuestTemp,
  getContextTemp,
  getExamTestQuestList,
  getTestTime,
  getUserName,
  selectChangeScreenTimes,
  updateChangeScreenTimes,
  updateTestTime,
} from "../api/get";
import { formatDate } from "../utils/date";
import { insertAllQuestTemp, insertQuestTemp, submitTest } from "../api/post";

export default {
  name: "TestView",
  filters: {
    formatDate(time) {
      const date = new Date(time);
      return formatDate(date, "HH:mm:ss");
    },
  },
  // // 判断从哪个路由跳转
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.routerPath = from.fullPath;
    });
  },
  data() {
    return {
      text_height: null,
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
      pageNum: 1, // 当前页码
      pageTotal: "", // 控制结束考试按钮显示-==总题数
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
      testStartTime: "", // 考试书籍开始时间
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
      endTime: '', // 获取考试的结束时间，用于卡控超时自动交卷
    };
  },
  created() {
    // this.userId = 'RenShiGuangLiuZhuanAiNiYiJiu'
    // this.userId = "huangxianchun-renliziyuanbu-27276";
    // this.userId = 'helenxia'
    this.userId =this.$root.userId;
    this.TEST_ID = this.$route.query.testId;
    this.testStartTime = this.$route.query.testStartTime;
    //this.getExamTestQuestList(this.TEST_ID,this.userId)
  },
  methods: {
    // 当选择下一题的时候保存上一题答案到暂存表
    PaginationChange() {
      if (this.testTimeType == "Y") {
        if (this.pageNum > this.nonPageNum) {
          if (this.pageNum == 1 && this.nonPageNum == 2) {
            this.pageNum = this.nonPageNum;
            this.$toast.fail("禁止点击上一题！");
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
          this.$toast.fail("禁止点击上一题！");
          return;
        }
      } else {
        // 更新剩余考试时间到数据库
        this.restTimeMinutes = this.timeStampToClock(this.restTimeStamp);
        updateTestTime(this.userId, this.TEST_ID, this.restTimeMinutes);
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
            this.insertTemp.userId = this.userId;
            this.insertTemp.testId = this.TEST_ID;
            insertQuestTemp(this.insertTemp);
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
    // 提交暂存
    submitTemp() {
      // 更新剩余考试时间到数据库
      this.restTimeMinutes = this.timeStampToClock(this.restTimeStamp);
      updateTestTime(this.userId, this.TEST_ID, this.restTimeMinutes);
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
      this.insertTemp.userId = this.userId;
      this.insertTemp.testId = this.TEST_ID;
      insertQuestTemp(this.insertTemp);
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
      this.insertTemp.userId = this.userId;
      this.insertTemp.testId = this.TEST_ID;
      insertQuestTemp(this.insertTemp);
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
    // 提交回答的分数
    showFinishPopup() {
      // 点击提交考试前，把最后一题提交暂存表
      this.submitLastTemp();
      // 更新题到暂存表
      // this.PaginationChange()
      this.ElapsedTime = this.toHHmmss(
        this.$moment(new Date()).diff(this.$moment(this.startTime))
      );
      getUserName(this.userId).then((res) => {
        this.userInfo = res.data.data;
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
      this.finishPopup = true;
    },
    // 判断所有题目，是否已回答
    showMenu() {
      this.Popup = true;
    },
    // 根据选择的题目，跳转到对应的题目
    jumpToQuestion(index) {
      this.Popup = false;
      if (this.testTimeType == "N") {
        this.pageNum = index + 1;
      }
    },
    // 结束并提交考试
    submitFinishTest() {
      // 判断是否全部答题
      if (
        this.havaAnswerCount ==
        this.PaperQuestionList.exam_paper.examQuestionList.length
      ) {
        this.submitTestMethod();
      } else {
        // 未全部答案
        this.$dialog
          .confirm({
            message: "还有题目未答完？是否结束考试",
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
    // 根据考试id获取试题
    getExamTestQuestList(TEST_ID, userId) {
      return getExamTestQuestList(TEST_ID, userId).then((res) => {
        this.PaperQuestionList = res.data.data;
        // 获取考试结束时间
        this.endTime = Date.parse(this.PaperQuestionList.END_TIME.replace(/-/g, "/"));
        this.pageTotal =
          this.PaperQuestionList.exam_paper.examQuestionList.length;
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
        });
        //  this.countinueGetTemp(this.userId, this.TEST_ID);
      });
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
      this.response.changeScreenTimes = this.changeScreenTimes;
      submitTest(this.response).then((res) => {
        this.$toast.success(res.data.data);
      });
      // 跳转页面
      this.$router.push({
        path: "/entry",
      });
    },
    // 定时器，倒计时，当倒计时结束后自动交卷
    AutoSubmitPaperTest() {
      // 调用moment插件计算时间差
      // const time = this.$moment(this.endTime).diff(this.$moment(new Date())) //时间类型time
      // 判断是否到结束时间，到结束时间，立即交卷
      if (this.endTime !=0) {
        if (this.$moment(this.endTime).diff(this.$moment(new Date())) <=0) {
            this.submitTestMethod();
        } else {
          console.log(this.$moment(this.endTime).diff(this.$moment(new Date())));
        }
      }
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
    // 继续考试的时候将暂存表数据获取赋值
    countinueGetTemp(userId, testId) {
      countinueGetTemp(this.userId, this.TEST_ID)
        .then((res) => {
          this.questTemp = res.data.data;
          this.response.testContext.forEach((item) => {
            this.questTemp.forEach((answer) => {
              // 判断是否是多选和判断
              if (item.quest_TYPE == "多选题" || item.quest_TYPE == "填空题") {
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

          // 处理答题数
          this.response.testContext.forEach((item) => {
            this.answerContent.forEach((count) => {
              if (item.quest_ID == count.quest_ID) {
                count.quest_ANSWER = item.quest_ANSWER;
                count.flag = 1;
              }
            });
          });
        })
        .then(() => {
          // 插入所有题目
          // 处理多选题、填空题数据
          this.insertAllTemp.Temp.forEach((item) => {
            // 多选题 填空
            if (item.questAnswer instanceof Array) {
              item.questAnswer = item.questAnswer.join(",");
            }
          });
          // 提交数据到后端
          this.insertAllTemp.userId = this.userId;
          this.insertAllTemp.testId = this.TEST_ID;
          // 判断暂存表是否有该人员的该场考试记录，无则插入
          getContextTemp(this.userId, this.TEST_ID).then((res) => {
            if (res.data.data.length == 0) {
              insertAllQuestTemp(this.insertAllTemp);
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
        });
    },
    // 通过方法判断从哪个页面进入
    goToTestByRouterPath() {
      // 通过进行中界面进入
      if (this.$route.query.routerPath == "/testSystem_onGoing") {
        getTestTime(this.userId, this.TEST_ID)
          .then((res) => {
            const time = res.data.data;
            this.restTimeStamp = this.clockToTimeStamp(time);
            // 跳转到已答题目位置
            this.pageNum = parseInt(this.$route.query.haveAnswered)+1;
          })
          .then((_) => {
            this.getExamTestQuestList(this.TEST_ID, this.userId)
              .then((_) => {
                if (this.timer) clearInterval(this.timer);
                this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
              })
              .then(() => {
                countinueGetTemp(this.userId, this.TEST_ID).then((res) => {
                  this.questTemp = res.data.data;
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
                            item.quest_ANSWER.toString().replace(/,/g, "")
                              .length > 0
                          ) {
                            this.havaAnswerCount++;
                          }
                        }
                      } else {
                        if (item.quest_ID == answer.questId) {
                          item.quest_ANSWER = answer.questAnswer;
                          if (
                            item.quest_ANSWER.toString().replace(/,/g, "")
                              .length > 0
                          ) {
                            this.havaAnswerCount++;
                          }
                        }
                      }
                    });
                  });

                  // 处理答题数
                  this.response.testContext.forEach((item) => {
                    this.answerContent.forEach((count) => {
                      if (item.quest_ID == count.quest_ID) {
                        count.quest_ANSWER = item.quest_ANSWER;
                        count.flag = 1;
                      }
                    });
                  });
                });
              });
          });
        // 通过正常进入界面
      } else {
        this.getExamTestQuestList(this.TEST_ID, this.userId).then(() => {
          countinueGetTemp(this.userId, this.TEST_ID)
            .then((res) => {
              this.questTemp = res.data.data;
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
                        item.quest_ANSWER.toString().replace(/,/g, "").length >
                        0
                      ) {
                        this.havaAnswerCount++;
                      }
                    }
                  } else {
                    if (item.quest_ID == answer.questId) {
                      item.quest_ANSWER = answer.questAnswer;
                      if (
                        item.quest_ANSWER.toString().replace(/,/g, "").length >
                        0
                      ) {
                        this.havaAnswerCount++;
                      }
                    }
                  }
                });
              });

              // 处理答题数
              this.response.testContext.forEach((item) => {
                this.answerContent.forEach((count) => {
                  if (item.quest_ID == count.quest_ID) {
                    count.quest_ANSWER = item.quest_ANSWER;
                    count.flag = 1;
                  }
                });
              });
            })
            .then(() => {
              // 插入所有题目
              // 处理多选题、填空题数据
              this.insertAllTemp.Temp.forEach((item) => {
                // 多选题 填空
                if (item.questAnswer instanceof Array) {
                  item.questAnswer = item.questAnswer.join(",");
                }
              });
              // 提交数据到后端
              this.insertAllTemp.userId = this.userId;
              this.insertAllTemp.testId = this.TEST_ID;
              // 判断暂存表是否有该人员的该场考试记录，无则插入
              getContextTemp(this.userId, this.TEST_ID).then((res) => {
                if (res.data.data.length == 0) {
                  insertAllQuestTemp(this.insertAllTemp).then(() => {
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
                      // 将时间更新到暂存
                      console.log(
                        "时间：",
                        this.restTimeMinutes,
                        this.TEST_ID,
                        this.userId
                      );
                      updateTestTime(
                        this.userId,
                        this.TEST_ID,
                        this.restTimeMinutes
                      );
                      this.restTimeStamp = this.clockToTimeStamp(
                        this.restTimeMinutes
                      );
                      if (this.timer) clearInterval(this.timer);
                      this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
                    } else {
                      // 总时间
                      this.restTimeMinutes = this.PaperQuestionList.TEST_TIME;
                      // 将时间更新到暂存
                      updateTestTime(
                        this.userId,
                        this.TEST_ID,
                        this.restTimeMinutes
                      );
                      this.restTimeStamp = this.clockToTimeStamp(
                        this.restTimeMinutes
                      );
                      if (this.timer) clearInterval(this.timer);
                      this.timer = setInterval(this.AutoSubmitPaperTest, 1000);
                    }
                  });
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
            });
        });
      }
    },
    //
    // 切屏
    onVisibilityChange() {
      if (!document[this.hiddenProperty]) {
        this.$toast.fail(
          "您已经切屏" + this.changeScreenTimes + "次\n达到五次自动交卷!"
        );
        if (this.changeScreenTimes > 4) {
          this.$toast.fail("您已切屏达到五次，自动交卷!");
          this.submitTestMethod();
        }
      } else {
        // 隐藏
        this.changeScreenTimes++;
      }
    },
    // 秒转分钟
    secondToMinute(data) {
      let s = "";
      s = parseFloat((data / 60).toString()).toFixed(2);
      return s;
    },
  },
  // watch:{
  //     routerPath(nv){
  //         if (nv == "/testSystem_onGoing") {
  //             getTestTime(this.userId,this.TEST_ID).then(res => {
  //                 const time = res.data.data
  //                     this.restTimeStamp = this.clockToTimeStamp(time)
  //             }).then(_=>{
  //                 this.getExamTestQuestList(this.TEST_ID,this.userId).then(_=>{
  //                     if(this.timer) clearInterval(this.timer)
  //                     this.timer = setInterval(this.AutoSubmitPaperTest,1000)
  //                 })
  //             })
  //         } else {
  //             this.getExamTestQuestList(this.TEST_ID,this.userId).then(() => {
  //                 if (this.PaperQuestionList.TEST_TIME == null) {
  //                     // 每题分开算
  //                     // 填空题时间
  //                     const fillingTime = this.secondToMinute(this.PaperQuestionList.TEST_TIME_CLOZE)*this.fillingCount;
  //                     // 多选
  //                     const multipleTime = this.secondToMinute(this.PaperQuestionList.TEST_TIME_M_CHOICE)*this.multipleSelectCount;
  //                     // 单选
  //                     const singleTime = this.secondToMinute(this.PaperQuestionList.TEST_TIME_S_CHOICE)*this.singleSelectCount;
  //                     // 判断
  //                     const judgeTime = this.secondToMinute(this.PaperQuestionList.TEST_TIME_JUDGE)*this.judgeCount;
  //                     this.restTimeMinutes = fillingTime + multipleTime + singleTime+judgeTime;
  //                     // 将时间更新到暂存
  //                     console.log("时间：",this.restTimeMinutes,this.TEST_ID,this.userId);
  //                     updateTestTime(this.userId,this.TEST_ID,this.restTimeMinutes)
  //                     this.restTimeStamp = this.clockToTimeStamp(this.restTimeMinutes)
  //                     if(this.timer) clearInterval(this.timer)
  //                     this.timer = setInterval(this.AutoSubmitPaperTest,1000)
  //                 } else {
  //                     // 总时间
  //                     this.restTimeMinutes = this.PaperQuestionList.TEST_TIME
  //                     // 将时间更新到暂存
  //                     updateTestTime(this.userId,this.TEST_ID,this.restTimeMinutes)
  //                     this.restTimeStamp = this.clockToTimeStamp(this.restTimeMinutes)
  //                     if(this.timer) clearInterval(this.timer)
  //                     this.timer = setInterval(this.AutoSubmitPaperTest,1000)
  //                 }
  //             })
  //         }

  //     }
  // },
  mounted() {
    const that = this;
    // 判断切屏
    that.hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
        ? "webkitHidden"
        : "mozHidden" in document
        ? "mozHidden"
        : null;
    that.visibilityChangeEvent = that.hiddenProperty.replace(
      /hidden/i,
      "visibilitychange"
    );
    document.addEventListener(
      that.visibilityChangeEvent,
      that.onVisibilityChange
    );
    this.goToTestByRouterPath();
  },
  beforeDestroy() {
    const that = this;
    document.removeEventListener(
      that.visibilityChangeEvent,
      that.onVisibilityChange
    );
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.colorRed {
  background-color: crimson;
}

#testView {
  position: relative;
  height: 100%;
  width: 100%;
}
#header .menu_btn >>> .van-button {
  position: relative;
  top: -8px;
}
#main {
  height: 100%;
  width: 100%;
}
#main .item_key {
  display: inline-block;
  background: steelblue;
  color: #fff;
  border: 1px solid steelblue;
  border-radius: 12px;
  padding: 2px 12px;
}
#main .item_content_title {
  height: 100px;
  padding: 5px 10px;
  text-align: left;
  margin-bottom: 15px;
  overflow: auto;
}
#Popup >>> .van-popup--top {
  top: 40px;
}
#Popup >>> .van-button--small {
}
#main #Popup .main_Popup {
  position: absolute;
  top: 20px;
}
#main .CheckChoice {
  padding: 5px 10px;
  text-align: left;
  margin-bottom: 10px;
  border: 1px solid lightsteelblue;
  border-radius: 12px;
}
.theCheckbox {
  height: calc(100% - 300px);
  overflow: auto;
}
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
#field {
  height: 100%;
  width: 100%;
}
#footer >>> .van-pagination__page-desc {
  display: none;
}
#questField >>> .van-field__label {
  margin-right: -30px;
}
#finishTestButton {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 99;
  height: 40px;
  width: 187.5px;
}
</style>
