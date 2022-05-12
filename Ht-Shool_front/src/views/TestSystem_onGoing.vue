<template>
<div>
    <!--        头部-->
    <div id="header">
        <van-row class="m-header">
            <van-col span="24">
                <van-icon name="arrow-left" @click="BackToEntry"/>
                　　　　　　考试中心-进行中
                　　　　　　  </van-col>
        </van-row>
    </div>
<!--    内容区-->
    <div id="main">
        <van-row style="position: relative;top: 30px" v-if="onGoingTestList.length==0">
            <van-col span="24">暂无考试正在进行！</van-col>
        </van-row>

        <div v-else>
            <div v-for="(item, index) in onGoingTestList" :key="index">
                <van-row  style="position: relative;top: 20px;background-color:#D7D7D7;width: 90%;left: 5%;" >
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 10px;">考试开考时间:{{item.startTime}}</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 10px">考试结束时间:{{item.endTime}}</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 8px">及格分:{{item.passingGrade}}分</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 8px">是否可补考:可补考</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 8px">终端支持:移动端</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 8px">已答/总题数:{{item.haveAnswered}}/{{item.countQuest}}</van-col>
                    <van-col span="22" style="position: relative;height: 40px;line-height: 40px;text-align: left;left: 8px">考试名称:<span>{{item.testName.slice(0,19)}}...</span></van-col>
                </van-row>
                <van-button type="primary" size="normal" style="position: relative;top: 60px;right: 40px;background-color: deepskyblue;" round @click="goToTestView">继续考试</van-button>
                <van-button type="primary" size="normal" style="position: relative;top: 60px;left: 40px;border: 1px solid aquamarine;" round @click="finishTest">结束考试</van-button>
            </div>
        </div>
    </div>
    <!--    底部-->
    <div id="footer">
        <van-grid clickable :column-num="3" id="testBottom">
            <van-grid-item   to="/testSystem_NoBegin" badge="1">未考试</van-grid-item>
            <van-grid-item   to="/testSystem_onGoing" style="color: deepskyblue">进行中</van-grid-item>
            <van-grid-item   to="/testSystem_isOver" >已考试</van-grid-item>
        </van-grid>
    </div>
</div>
</template>

<script>
    import {getExamTestQuestList, TestForOnGoing} from "../api/get";
    import {addToOnGoing, OnGoingFinishTest} from "../api/post";

    export default {
        name: "testSystem_onGoing",
        data () {
            return {
                onGoingTestList: [], // 接收正在考试的数据
                TestList: [], // 接收需要考试的数据
                totalQuestCount: 0, // 获取本考试总题数
                hiddenProperty: null, // 判断切屏
                visibilityChangeEvent: null,
                changeScreenTimes: 0, // 计算切屏次数
                startTime: "",
                endTime: ""

            }
        },
        created() {
            const _this = this;
            // 获取用户ID
            _this.userId = _this.$root.userId
            // _this.userId = "huangxianchun-renliziyuanbu-27276"
            // this.userId = 'helenxia'
            // this.userId = 'LiuLiRong-ZiXunJiShuBu-23389'
            _this.getOnGoingTest(_this.userId)
        },
        methods: {
            // 退回首页
            BackToEntry () {
                // this.$router.go(-1);
                this.$router.push({
                    path: '/entry'
                })
            },
            // 跳转到考试界面
            goToTestView () {
                this.endTime =new Date(Date.parse(this.endTime.replace(/-/g,"/")))
                if (this.endTime < new Date()) {
                    this.$dialog.confirm({
                        message: "已超过考试时间，是否直接结束考试？"
                    }).then(() => {
                        this.finishTest()
                    }).catch(() => {
                        this.$toast.fail("已取消！")
                    })
                } else {
                    // const obj = {
                    //     userId: this.userId,
                    //     testId: this.onGoingTestList[0].testId,
                    //     testStartTime: this.onGoingTestList[0].startTime
                    // }
                    // addToOnGoing(obj).then(res => {
                    //     this.$toast.success("获取数据成功")
                    // })
                    this.$router.push({
                        path: '/testView',
                        query: {
                            testId: this.onGoingTestList[0].testId,
                            testStartTime: this.toTimeFormate(new Date()),
                            routerPath: '/testSystem_onGoing',
                            haveAnswered: this.onGoingTestList[0].haveAnswered
                        }
                    })
                }
            },
            // 结束考试
            finishTest () {
                // 未全部答案
                this.$dialog.confirm({
                    message: '确定结束考试？'
                }).then(() => {
                    // 通过userId和testId获取考试暂存题目答案结束考试,并清除正在进行考试的标记
                    let obj = {
                        userId: this.userId,
                        testId: this.onGoingTestList[0].testId
                    }
                    OnGoingFinishTest(obj).then(res => {
                        this.$toast.success(res.data.data)
                    })
                    this.$router.push({
                        path: '/entry',
                    })
                }).catch(() => {
                    this.$toast.fail('已取消!')
                })
            },
            toTimeFormate(date) {
                let Y = date.getFullYear()
                let M = date.getMonth() + 1 - 0 >= 10 ? Number(date.getMonth()) + 1 : '0' + (Number(date.getMonth()) + 1)
                let D = date.getDate()
                let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
                let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
                let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
                return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
            },
            getOnGoingTest(u) {
                TestForOnGoing(u).then(res => {
                    this.onGoingTestList = res.data.data;
                    if (this.onGoingTestList.length != 0) {
                        console.log("ongoing",this.onGoingTestList)
                        this.endTime = this.onGoingTestList[0].endTime
                        this.startTime = this.onGoingTestList[0].startTime
                        // getExamTestQuestList(this.onGoingTestList[0].testId,this.userId).then(res => {
                        //     this.TestList = res.data.data
                        //     this.totalQuestCount = this.TestList.exam_paper.examQuestionList.length
                        // })
                    }

                })

            }
        },

    }
</script>

<style scoped>

</style>
