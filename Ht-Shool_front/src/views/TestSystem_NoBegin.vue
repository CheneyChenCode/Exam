<template>
<div id="noBegin">
    <!--        头部-->
    <div id="header">
        <van-row class="m-header">
            <van-col span="24">
                  <van-icon name="arrow-left" @click="BackToEntry"/>
                　　　　　　考试中心-未考试
                　　　　　　  </van-col>
        </van-row>
    </div>
<!--    内容区-->
    <div id="main">
        <van-row style="position: relative;top: 30px" v-show="NoBeginList.length == 0" >
        <van-col span="24">暂无未考试信息！
        </van-col>
        </van-row>

        <div id="noBeginInfo" >
                <van-row v-for="(item, index) in NoBeginList" :key="index" style="position: relative;top: 20px;background-color:#D7D7D7;width: 90%;left: 5%;height: 100px;top: 5px;margin: 1px;border-radius: 10px" @click="startTest(index)">
                    <div>
                        <span v-if="item.preTestId== null" style="position: absolute;background-color: cornflowerblue;display: inline-block;height: 100px;align: center;line-height: 100px;left: 0px">考试</span>
                        <span v-else style="position: absolute;background-color: rgba(255,0,19,0.36);display: inline-block;height: 100px;align: center;line-height: 100px;left: 0px">补考</span>
                    </div>
                    <div>
                        <span style="position: absolute;left: 35px">开始时间:</span>
                        <span style="position: absolute;left: 100px;width: 240px;">{{item.startTime}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;left: 35px;top: 24px">结束时间:</span>
                        <span style="position: absolute;top: 24px;left: 100px;width: 240px;">{{item.endTime}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;top: 50px;left: 35px">考试类型:</span>
                        <span style="position: absolute;top: 50px">{{getStatusTypeString(item.paperType)}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;top: 75px;left: 35px">考试名称:</span>
                        <span style="position: absolute;top: 75px;" @click="showDetailTestName(index)"><span v-if="item.testName.length<=9">{{item.testName}}</span><span v-else>{{item.testName.slice(0,9)}}…</span></span>
                    </div>
                </van-row>
        </div>
        <!--显示完整名称-->
        <div id="TestNamePopup" @click="closeTestNamePopup">
            <van-popup v-model="testNamePopup" style="width: 80%;height: 10%;border-radius: 12px;"  >
                <span >{{testName}}</span>
            </van-popup>
        </div>
<!--        显示考试须知-->
        <div id="TestInstruction" v-if="NoBeginList.length !=0">
            <van-popup v-model="testInstructionPopup" :style="[{height: instrutionPopupHeight},{width: '60%'}]" round>
                <van-row style="font-weight: bold;padding: 5px;top: 5px">考试须知</van-row>
                <van-row style="text-align: center;margin: 5px;padding: 5px;position: relative;top: 5px">
                    <div v-if="NoBeginList[testIndex].testTime == null">
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;">1.考试不能返回上一题</van-col>
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 3px">2.切屏达5次自动交卷</van-col>
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 6px">3.到每种题型考试时间会自动跳转下一题</van-col>
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 9px">4.单选题:{{NoBeginList[testIndex].singleTime}} 秒</van-col>
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 12px">5.多选题:{{NoBeginList[testIndex].multipleTime}} 秒</van-col>
                        <van-col span="24" style="padding: 5px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 15px">6.填空题:{{NoBeginList[testIndex].fillingTime}} 秒</van-col>
                    </div>
                    <div v-else>
                        <van-col span="24" style="padding: 10px; border: 0.5px solid gray; border-radius: 12px;">1.考试到时间自动交卷</van-col>
                        <van-col span="24" style="padding: 10px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 3px">2.切屏达5次自动交卷</van-col>
                        <van-col span="24" style="padding: 10px; border: 0.5px solid gray; border-radius: 12px;position: relative;top: 6px">3.考试时长:{{NoBeginList[testIndex].testTime}} 分</van-col>
                    </div>
                    <van-col span="24">
                        <van-button round style="position: relative;width: 80px; top: 21px" type="primary" v-if="instrutionTime > 0">{{instrutionTime}} s</van-button>
                        <van-button round style="position: relative;width: 80px; top: 21px" type="primary" @click="goToTest" v-else>确定</van-button>
                    </van-col>
                </van-row>
            </van-popup>
        </div>
    </div>


<!--底部-->
    <div id="footer">
        <van-grid clickable :column-num="3" id="testBottom">
            <van-grid-item   to="/testSystem_NoBegin" style="color: deepskyblue">未考试</van-grid-item>
            <van-grid-item   to="/testSystem_onGoing">进行中</van-grid-item>
            <van-grid-item   to="/testSystem_isOver">已考试</van-grid-item>
        </van-grid>
    </div>

</div>
</template>

<script>

    import {addToOnGoing} from "../api/post";
    import {getTestFlag, havingOnging, TestForNoBegin} from "../api/get";

    export default {
        name: "TestSystem",
        data () {
            return {
                userId: '', // 登录人员的userId
                testNamePopup: false,
                testName: '', // 完整名称
                NoBeginList: {
                    testId: "",
                    endTime: "",
                    startTime: "",
                    testName: "",
                    testTime: "",
                    prtTestId: "",
                    singleTime: "",
                    multipleTime: "",
                    judgeTime: "",
                    fillingTime: "",
                    paperType: ""
                }, // 获取未开始考试的记录
                testStartTime: '', // 考试实际开始时间
                testInstructionPopup: false, // 考试须知控制
                instrutionTime: 5, // 倒计时确认查看考试须知
                testIndex: 0, // 考试下标
                instrutionPopupHeight: "", // 考试须知弹出层高度
                lastClickTime: 0, // 监听点击时间
            }
        },
        methods: {
            clearTimer() {
                this.testInstructionPopup = false;
                if(this.timer) {
                    clearInterval(this.timer)
                    this.instrutionTime = 5;
                }
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
            // 退回到首页
            BackToEntry () {
                // this.$router.go(-1);
                this.$router.push({
                    path: '/entry'
                })
            },
            // 显示具体的考试名称
            showDetailTestName(index) {
                // 判断考试名称长度超过时显示----
                if (this.NoBeginList[index].testName.length>=10) {
                    this.testName = this.NoBeginList[index].testName
                    this.testNamePopup =true;
                }

            },
            // 关闭显示具体名称
            closeTestNamePopup () {
                this.testName = ''
                this.testNamePopup = false
            },
            // 前往考试
            startTest (index) {
                this.testIndex = index;
                if (this.NoBeginList[index].testTime == null) {
                    this.instrutionPopupHeight = "48%"
                } else {
                    this.instrutionPopupHeight = "38%"
                }
                this.testInstructionPopup = true;
                if(this.timer) {
                    clearInterval(this.timer)
                    this.instrutionTime = 5;
                }
                this.timer = setInterval(this.showInstrutionTime,1000)
            },
            goToTest() {
                // 处理字符串转时间
                const start = new Date(Date.parse(this.NoBeginList[this.testIndex].startTime.replace(/-/g,"/")));
                const end = new Date(Date.parse(this.NoBeginList[this.testIndex].endTime.replace(/-/g,"/")));
                const newDate = new Date();

                getTestFlag(this.userId,this.NoBeginList[this.testIndex].testId).then(res => {
                    const flag = res.data.data
                    if (flag == 1) {
                        this.$toast.fail("您未刷卡！")
                    } else {
                        // 判断是否已经有正在考试的信息，有则禁止考试，等待进行中考试结束才能开始考试
                        havingOnging(this.userId).then(res => {
                            if (res.data.data ===0) {
                                // 判断当前时间在考试范围内
                                if (start < newDate && end > newDate) {
                                    this.testStartTime =this.toTimeFormate(new Date())
                                    // 添加记录到数据库，标记为正在进行考试

                                    const obj = {
                                        userId: this.userId,
                                        testId: this.NoBeginList[this.testIndex].testId,
                                        testStartTime: this.testStartTime
                                    }
                                    // addToOnGoing(obj).then(res => {
                                    //     this.$toast.success("获取数据成功")
                                    // })
                                    // 跳转到考试
                                    this.$router.push({
                                        path: '/testView',
                                        query: {
                                            testId: this.NoBeginList[this.testIndex].testId,
                                            testStartTime: this.testStartTime,
                                            routerPath: '/testSystem_noBegin'
                                        }
                                    })
                                } else {
                                    // 如果当前时间超过正常考试时间
                                    if(new Date() > end) {
                                        this.$toast.fail("已超时！禁止考试")
                                    } else {
                                        //当前时间未到
                                        this.$toast.fail("未到考试时间！")
                                    }

                                }
                            } else {
                                this.$toast.fail("当前已有正在进行的考试！")
                            }
                        })
                    }
                })
            },
            // 跳转界面获取未考试信息
            getTestForNoBegin(u){
                TestForNoBegin(u).then(res => {
                    this.NoBeginList = res.data.data
                    console.log("aa",this.NoBeginList)
                })
            },
            // 根据类型号码变更显示文字
            getStatusTypeString (var1) {
                let res = ''
                switch (var1) {
                    case "1":
                        res = '公司层级'
                        break
                    case "2":
                        res = '部门层级'
                        break
                    case "3":
                        res = '岗位层级'
                        break
                }
                return res
            },
            // 定时减少查看考试须知时间
            showInstrutionTime() {
                    if (this.instrutionTime > 0) {
                        this.instrutionTime --;
                    } else {
                        clearInterval(this.timer)
                    }
            },
        },

        created() {
            // this.userId = this.$root.userId
            // this.userId = 'ChenJiaYu-ZiXunJiShuBu-21705'

        },
        mounted() {
            this.userId = this.$root.userId;
            // this.userId = 'zhangke-TSV8cungongchengbu-27150'
            // this.userId = 'huangxianchun-renliziyuanbu-27276'
            // this.userId = 'YiShenBiaoYanGaiBuZhuShuai'
            this.getTestForNoBegin(this.userId)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        watch: {
            testInstructionPopup: {
                handler(newVal) {
                    if (newVal == false) {
                        clearInterval(this.timer)
                    }
                },
            }
        }
    }
</script>

<style scoped>
@import "../assets/css/testSystem_noBegin.css";
</style>
