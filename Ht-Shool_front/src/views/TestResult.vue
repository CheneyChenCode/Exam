<template>
<div id="testResult">
    <div style="height: 100%;width: 100%;">
        <!--        头部-->
        <div id="header">
            <van-row class="m-header">
                <van-col span="24">
                    <van-icon name="arrow-left" @click="BackToEntry"/>
                    　　　　　　考试中心-考试结果
                    　　　　　　  </van-col>
            </van-row>
            <van-row gutter="20" align="center" style="height: 40px;line-height:40px;background-color: #F2F2F2;border-top: gray solid 0.5px">
                <van-col span="8" class="menu_btn" ><van-button size="small"  type="primary" round style="position: relative; left: 130px;width: 90px" @click="showMenu">目录</van-button></van-col>
            </van-row><br>
        </div>
        <!-- 考试内容页面-->
        <div id="main">
            <!--  单选题 -->
            <div v-if="this.TestResult.questList[pageNum-1].questType=='单选题'">
                <van-row type="flex">
                    <van-col span="6"><span class="item_key">单选题</span></van-col>
                    <van-col span="8">第{{pageNum}}题({{this.TestResult.questList[pageNum-1].questScore}}分)</van-col>
                    <van-col span="10"></van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" class="item_content_title" style="position: relative;border: rgba(101,228,255,0.56)solid 1px;border-radius: 12px;top: 10px">{{TestResult.questList[pageNum-1].questContext}}</van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" v-if="TestResult.questList[pageNum-1].isCorrect== '1'" style="position: relative;top:10px;color: deepskyblue">回答正确<van-icon name="success"></van-icon></van-col>
                    <van-col span="24" v-else style="position: relative;top:10px;color: red">回答错误<van-icon name="cross"></van-icon></van-col>
                </van-row>

                <van-radio-group v-model="response.testContext[pageNum-1].quest_ANSWER" style="position: relative;top: 40px">
                    <van-col v-for="(item, index) in TestResult.questList[pageNum-1].options" span="22" offset="1" class="CheckChoice" :key="index">
                        <van-radio :name="item.questItemLetter" :key="index" disabled>{{item.questItemLetter}}.{{item.questItemContext}}</van-radio>
                    </van-col>
                </van-radio-group>

            </div>

            <!--            多选题-->
            <div v-if="this.TestResult.questList[pageNum-1].questType=='多选题'">
                <van-row type="flex">
                    <van-col span="6"><span class="item_key">多选题</span></van-col>
                    <van-col span="8">第{{pageNum}}题({{TestResult.questList[pageNum-1].questScore}}分)</van-col>
                    <van-col span="10"></van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" class="item_content_title" style="position: relative;border: rgba(101,228,255,0.56)solid 1px;border-radius: 12px;top: 10px">{{TestResult.questList[pageNum-1].questContext}}</van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" v-if="TestResult.questList[pageNum-1].isCorrect== '1'" style="position: relative;top:10px;color: deepskyblue">回答正确<van-icon name="success"></van-icon></van-col>
                    <van-col span="24" v-else style="position: relative;top:10px;color: red">回答错误<van-icon name="cross"></van-icon></van-col>
                </van-row>
                <van-checkbox-group  v-model="response.testContext[pageNum-1].quest_ANSWER" style="position: relative;top: 40px">
                    <van-col v-for="(item, index) in TestResult.questList[pageNum-1].options"  span="22" offset="1" class="CheckChoice" :key="index">
                        <van-checkbox :name="item.questItemLetter" :key="index" disabled>{{item.questItemLetter}}.{{item.questItemContext}}</van-checkbox>
                    </van-col>
                </van-checkbox-group>
            </div>

            <!--判断题-->
            <div v-if="this.TestResult.questList[pageNum-1].questType=='判断题'">
                <van-row type="flex">
                    <van-col span="6"><span class="item_key">判断题</span></van-col>
                    <van-col span="8">第{{pageNum}}题({{TestResult.questList[pageNum-1].questScore}}分)</van-col>
                    <van-col span="10"></van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" class="item_content_title" style="position: relative;border: rgba(101,228,255,0.56)solid 1px;border-radius: 12px;top: 10px">{{TestResult.questList[pageNum-1].questContext}}</van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" v-if="TestResult.questList[pageNum-1].isCorrect== '1'" style="position: relative;top:10px;color: deepskyblue">回答正确<van-icon name="success"></van-icon></van-col>
                    <van-col span="24" v-else style="position: relative;top:10px;color: red">回答错误<van-icon name="cross"></van-icon></van-col>
                </van-row>

                <van-radio-group v-model="response.testContext[pageNum-1].quest_ANSWER" style="position: relative;top: 40px">
                    <van-col v-for="(item, index) in TestResult.questList[pageNum-1].options" span="22" offset="1" class="CheckChoice" :key="index">
                        <van-radio :name="item.questItemLetter" :key="index" >{{item.questItemLetter}}.{{item.questItemContext}}</van-radio>
                    </van-col>
                    <!--                    <van-col span="22" offset="1" class="CheckChoice"><van-radio name="error">{{this.PaperQuestionList[0].data[0].exam_paper[0].examQuestionList[pageNum-1].examQuestionOptionList[1].option_ITEM_CONTEXT}}</van-radio></van-col>-->
                </van-radio-group>
            </div>

            <!--  填空题 -->
            <div v-if="this.TestResult.questList[pageNum-1].questType=='填空题'" id="field">
                <van-row type="flex">
                    <van-col span="6"><span class="item_key">填空题</span></van-col>
                    <van-col span="8">第{{pageNum}}题({{TestResult.questList[pageNum-1].questScore}}分)</van-col>
                    <van-col span="10"></van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" class="item_content_title">{{TestResult.questList[pageNum-1].questContext}}</van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="24" v-if="TestResult.questList[pageNum-1].isCorrect== '1'" style="position: relative;top:10px;color: deepskyblue">回答正确<van-icon name="success"></van-icon></van-col>
                    <van-col span="24" v-else style="position: relative;top:10px;color: red">回答错误<van-icon name="cross"></van-icon></van-col>
                </van-row>

                <van-checkbox-group id="theCheckBox" class="checkbox">
                    <van-col v-for="(item, index) in TestResult.questList[pageNum-1].options"  span="22" offset="1" class="CheckChoice" :key="index">
                        <van-field disabled v-model="response.testContext[pageNum-1].quest_ANSWER[index]" :label="item.questItemLetter+'.'" class="filedText"></van-field>
                    </van-col>
                </van-checkbox-group>


            </div>

        </div>
        <!--        显示是否答题和题目跳转-->
        <!--        style="background-color: rgba(255,0,19,0.56);"-->
        <div id="Popup">
            <van-popup v-model="Popup"  position="top">
                <van-button size="small" class="main_Popup" style="padding: 2px;margin: 2px 4px" v-for="(item, index) in TestResult.questList" @click="jumpToQuestion(index)" :key="index">
                    <span v-if="item.isCorrect==1">题目{{index+1}} 正确</span>
                    <span v-else style="background-color: red;">题目{{index+1}} 错误</span>
                </van-button>
            </van-popup>
        </div>

        </div>
        <!-- 底部 -->
        <div id="footer">
            <!--分页-->
            <van-pagination v-model="pageNum" :page-count="TestResult.questList.length" show-page-size="1" id="Pagination" mode="simple" >
                <template #prev-text>
                    上一题
                </template>
                <template #next-text>
                    下一题
                </template>
            </van-pagination>
        </div>
</div>
</template>

<script>
    import {getHistoryContextResult} from "../api/get";

    export default {
        name: "TestResult",
        data () {
            return {
                pageNum: 1, // 页码
                userId: "", // 用户id
                testId: "", // 考试id
                TestResult: {
                    testId: "",
                    questBankId: "",
                    questBanVersion: "",
                    questList: [{
                        questId: "",
                        questType: "",
                        questContext: "",
                        questScore: "",
                        questAnswer: "",
                        questLabel: "",
                        questLevel: "",
                        questExplain: "",
                        isCorrect: "",
                        options: [{
                            questId: "",
                            questItemContext: "",
                            questItemLetter: ""
                        }]
                    }]
                }, // 考试结果
                response: {
                    testContext:[
                        {
                            quest_ID: "",
                            quest_ANSWER: [],
                            quest_SCORE: "",
                            quest_TYPE: "",
                            option_ITEM_LETTER: ""
                        }
                    ]
                }, // 考生回答的答案
                Popup: false, // 控制弹出层
            }
        },
        created() {
            // this.userId = 'huangxianchun-renliziyuanbu-27276';
            //  this.userId =  'i.d.v.e'
            // this.userId = 'huzhengbang-renliziyuanbu-27323'
            this.userId =this.$root.userId;
            this.testId =  this.$route.query.testId;
            this.getHistoryContextResult(this.userId,this.testId);
        },
        methods: {
            // 退回到首页
            BackToEntry () {
                // this.$router.go(-1);
                this.$router.push({
                    path: '/entry'
                })
            },
            // 获取考试结果
            getHistoryContextResult(userId,testId) {
                getHistoryContextResult(userId,testId).then(res => {
                    console.log("结果:",res);
                    this.TestResult = res.data.data
                    this.response.testContext = []
                    this.TestResult.questList.forEach((item) => {
                        if (item.questType == "填空题") {
                            this.response.testContext.push({ quest_ID: item.questId, quest_ANSWER: new Array(item.options.length),quest_SCORE: item.questScore,quest_TYPE: item.questType})
                        } else if (item.questType == "多选题") {
                            this.response.testContext.push({ quest_ID: item.questId, quest_ANSWER: [],quest_SCORE: item.questScore,quest_TYPE: item.questType})
                        }
                        else{
                            this.response.testContext.push({ quest_ID: item.questId, quest_ANSWER: "",quest_SCORE: item.questScore,quest_TYPE: item.questType})
                        }
                    });
                    this.TestResult.questList.forEach((item) => {
                        this.response.testContext.forEach((list) => {
                            if (item.questId == list.quest_ID) {
                                if (item.questType == "多选题" || item.questType == "填空题") {
                                    list.quest_ANSWER = item.questAnswer.split(",")
                                } else {
                                    list.quest_ANSWER = item.questAnswer
                                }

                            }
                        })
                    })
                })
            },
            // 题目跳转
            showMenu () {
                this.Popup = true
            },
            // 根据选择的题目，跳转到对应的题目
            jumpToQuestion (index) {
                this.Popup = false
                this.pageNum = index+1
            },
        }
    }
</script>

<style scoped>
    #testResult {
        position: relative;
        height: 100%;
        width: 100%;
    }
    #header .menu_btn >>> .van-button{
        position: relative;
        top: -8px;
    }
    #main {
        position: relative;
        height: 100%;
        width: 100%;
    }
    #field {
        height: 100%;
        width: 100%;
    }
    #main .item_key{
        display: inline-block;
        background: steelblue;
        color: #fff;
        border: 1px solid steelblue;
        border-radius: 12px;
        padding: 2px 12px;
    }
    #main .item_content_title{
        position: relative;
        border: rgba(101,228,255,0.56)solid 1px;
        border-radius: 12px;
        top: 5px;
        padding: 5px 10px;
        text-align: left;
        margin-bottom: 15px;
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
    #main .CheckChoice{
        padding: 5px 10px;
        text-align: left;
        margin-bottom: 10px;
        border: 1px solid lightsteelblue;
        border-radius: 12px;
    }
    .CheckChoice >>> .van-radio__label--disabled {
        color: #2c3e50;
    }
    .CheckChoice >>> .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
        color: coral;
    }
    .CheckChoice >>> .van-checkbox__label--disabled {
        color: #2c3e50;
    }
    .CheckChoice >>> .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
        color: coral;
    }
    .CheckChoice >>> .van-field--disabled .van-field__label {
        color: #2c3e50;
    }
    .CheckChoice >>> .van-field__control:disabled {
        -webkit-text-fill-color: black;
    }
    #theCheckBox {
        position: relative;
        top: 40px;
    }
    .checkbox {
        height: calc(100% - 480px);
        width: 100%;
        overflow: auto;
    }
    #footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    #footer >>> .van-pagination__page-desc{
        display: none;
    }
</style>
