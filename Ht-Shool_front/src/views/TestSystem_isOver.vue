<template>
<div id="isOver">
    <!--        头部-->
    <div id="header">
        <van-row class="m-header">
            <van-col span="24">
                <van-icon name="arrow-left" @click="BackToEntry"/>
                　　　　　　考试中心-已考试
                　　　　　　  </van-col>
        </van-row>
    </div>
<!--    内容区-->
    <div id="main">
        <van-row style="position: relative;top: 30px" v-if="isOverTestList.length == 0">
            <van-col span="24">暂无已考试记录！</van-col>
        </van-row>
        <div v-else id="mainContent">
            <div v-for="(item, index) in isOverTestList" :key="index" @click="showIsOverDetail(index)">
                <van-row style="position: relative;top: 20px;background-color:#D7D7D7;width: 90%;left: 5%;height: 100px;top: 5px;margin: 1px;border-radius: 10px">
                    <div>
                        <span v-if="item.testScore >= item.passingGrade" style="position: absolute;background-color: cornflowerblue;display: inline-block;height: 100px;align: center;line-height: 50px;left: 0px;width: 25px;font-size: 20px;border-radius: 10px">及格</span>
                        <span v-else style="position: absolute;background-color: red;display: inline-block;height: 100px;align: center;line-height: 33px;left: 0px;width: 25px;font-size: 20px;border-radius: 10px">不及格</span>
                    </div>
                    <div>
                        <span style="position: absolute;left: 35px">开始时间:</span>
                        <span style="position: absolute;left: 100px;width: 240px;">{{item.startTime.slice(0,19)}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;left: 35px;top: 24px">结束时间:</span>
                        <span style="position: absolute;top: 24px;left: 100px;width: 240px;">{{item.endTime.slice(0,19)}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;top: 50px;left: 35px">考试类型:</span>
                        <span style="position: absolute;top: 50px">{{getStatusTypeString(item.paperType)}}</span>
                    </div>
                    <div>
                        <span style="position: absolute;top: 75px;left: 35px">考试名称:</span>
                        <span style="position: absolute;top: 75px;"><span v-if="item.testName.length<10">{{item.testName}}</span><span v-else>{{item.testName.slice(0,10)}}</span></span>
                    </div>
                </van-row>
            </div>

            <!--显示完整信息-->
            <div id="TestNamePopup" @click="closeIsOverPopup">
                <van-popup v-model="isOverPopup" :style="[{width: (90+'%')},{borderRadius: (12+'px')},{fontSize: (20+'px')},{height: (isOverTestList[testIndex].testScore < isOverTestList[testIndex].passingGrade ?'65%':'52%')}]" round duration="0.5" >
                    <van-row style="position: relative;top: 10px;border: 1px solid grey;border-radius: 12px;background-color: bisque;">
                        <van-col span="24" style="font-weight: bold">考试名称</van-col>
                        <van-col span="24" style="font-weight: bold">{{testName}}</van-col>
                    </van-row>
                    <van-row style="position: relative;top: 30px;border-bottom: 1px solid grey;border-radius: 12px;background-color: bisque;">
                        <van-col span="24">实际开始时间:</van-col>
                        <van-col span="24">{{TestStartTime.slice(0,19)}}</van-col>
                    </van-row>
                    <van-row style="position: relative;top: 40px;border-bottom: 1px solid grey;border-radius: 12px;background-color: bisque;">
                        <van-col span="24">实际结束时间:</van-col>
                        <van-col span="24">{{submitTime.slice(0,19)}}</van-col>
                    </van-row>
                    <van-row style="position: relative;top: 50px;border-bottom: 1px solid grey;border-radius: 12px;background-color: bisque;">
                        <van-col span="24">考试得分:</van-col>
                        <van-col span="24">{{testScore}}分</van-col>
                    </van-row>
                    <van-row style="position: relative;top: 60px;border-bottom: 1px solid grey;border-radius: 12px;background-color: rgba(255,135,97,0.56);padding: 1px;margin: 1px">
                        <van-col span="24">查看考试结果</van-col>
                        <van-col span="24"><van-button round type="primary" style="width: 70px" plain @click="goToResult">详情</van-button></van-col>
                    </van-row>
                    <van-row v-if="isOverTestList[testIndex].testScore < isOverTestList[testIndex].passingGrade" style="position: relative;top: 68px;border-bottom: 1px solid grey;border-radius: 12px;background-color: rgba(255,0,53,0.36);padding: 1px;margin: 1px">
                        <van-col span="24">点击补考</van-col>
                        <van-col span="24"><van-button round type="danger" style="width: 70px" plain @click="resit">补考</van-button></van-col>
                    </van-row>
                </van-popup>
            </div>
        </div>
        </div>


    <!--    底部-->
    <van-grid clickable :column-num="3" id="testBottom">
        <van-grid-item   to="/testSystem_NoBegin" >未考试</van-grid-item>
        <van-grid-item   to="/testSystem_onGoing"  >进行中</van-grid-item>
        <van-grid-item   to="/testSystem_isOver" style="color: deepskyblue">已考试</van-grid-item>
    </van-grid>
</div>
</template>

<script>
    import {addNextExamTestPersonal, havingOnging, TestForIsOver} from "../api/get";
    import {addToOnGoing} from "../api/post";

    export default {
        name: "testSystem_isOver",
        data () {
            return {
                isOverPopup: false,
                isOverTestList: [], // 接收已经考完试的列表
                testName: '', // 试卷名称
                TestStartTime: '', // 实际考试开始时间
                submitTime: '', // 实际考试结束时间
                testScore: '', // 考试得分
                testIndex: 0, // 考试下标
                testStartTime: '' // 新补考实际开始时间
            }
        },
        methods: {
            // 退回首页
            BackToEntry () {
                // this.$router.go(-1);
                this.$router.push({
                    path: '/entry'
                })
            },
            // 显示考试具体信息
            showIsOverDetail(index) {
                this.testName = this.isOverTestList[index].testName
                this.TestStartTime =this.isOverTestList[index].testStartTime.slice(0,19)
                this.submitTime =this.isOverTestList[index].submitTime.slice(0,19)
                this.testScore=this.isOverTestList[index].testScore
                this.isOverPopup =true;
                this.testIndex = index
            },
            // 关闭具体信息
            closeIsOverPopup () {
                // this.testName = ''
                this.isOverPopup = false
            },
            // 获取已经考试信息
            getIsOverTest (u) {
                TestForIsOver(u).then(res => {
                    this.isOverTestList = res.data.data;
                    console.log(this.isOverTestList)
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
            // 前往考试结果页面
            goToResult () {
                console.log(this.isOverTestList[this.testIndex].testId)
                console.log(this.testIndex)
                this.$router.push({
                    path: '/testResult',
                    query: {
                        testId: this.isOverTestList[this.testIndex].testId,
                    }
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
            // 补考接口
            addNextExamTestPersonal (testId,userId) {
                addNextExamTestPersonal(testId,userId).then(res => {
                    console.log(res)
                    if (res.data.code === 1000) {
                        this.$toast.success(res.data.msg)
                        this.testStartTime = this.toTimeFormate(new Date())
                        // havingOnging(this.userId).then(item => {
                        //     if (item.data.data === 0 ) {
                        //         // const obj = {
                                //     userId: this.userId,
                                //     testId: res.data.data,
                                //     testStartTime: this.testStartTime
                                // }
                                // console.log(obj)
                                // addToOnGoing(obj).then(res => {
                                //     this.$toast.success("获取数据成功")
                                // })
                                 this.$toast.success("获取数据成功")
                                // 跳转到考试
                                this.$router.push({
                                    path: '/testView',
                                    query: {
                                        testId: res.data.data,
                                        testStartTime: this.testStartTime,
                                        routerPath: '/testSystem_isOver'
                                    }
                                })
                        //     } else {
                        //         this.$toast.fail("有考试正在进行中，已生成新补考！")
                        //     }
                        // })
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                })
            },
            // 补考
            resit () {
                this.$dialog.confirm({
                    message: '是否开始补考'
                }).then(() => {
                    this.addNextExamTestPersonal(this.isOverTestList[this.testIndex].testId,this.userId)
                }).catch(() => {
                    this.$toast.fail('已取消!')
                })
            }
        },
        created() {
            // this.userId = 'huzhengbang-renliziyuanbu-27323'
            this.userId =this.$root.userId;
            // this.userId = 'huangxianchun-renliziyuanbu-27276'
            //  this.userId = 'i.d.v.e'
            this.getIsOverTest(this.userId)

        }
    }
</script>

<style scoped>
    #isOver {
    height: 100%;
    width: 100%;
}
    #main {
    height: 100%;
    width: 100%;
    }
    #mainContent {
        height: calc(100% - 100px);
        overflow: auto;
    }
</style>
