<template>
    <div>
<!--        头部-->
        <div>
            <van-row class="m-header">
                <van-col span="24">
                   华天学堂
                </van-col>
            </van-row>
        </div>
<!--      功能跳转  -->
        <van-grid :column-num="1" class="entry_main" gutter="0px">
            <van-grid-item icon="edit" text="考试中心" to="/testSystem_NoBegin" />
<!--            <van-grid-item icon="orders-o" text="质量红宝书内容解读(视频)" url="https://htks-hub.htkjks.com:8889/质量红宝书内容解读 2022.02.28.mp4"></van-grid-item>-->
            <van-grid-item v-if="pptFlag == 'Y'" icon="orders-o" text="质量红宝书内容解读(PPT)" url="https://htks-hub.htkjks.com:8889/质量“红宝书“内容解读-2022.3.19 (最终）.pdf"></van-grid-item>
            <van-grid-item v-else icon="orders-o" text="质量红宝书内容解读(PPT)" @click="pptMessage"></van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import {getUserIdInfo, getWxJsSdkConfig} from "../api/get";

    export default {
        name: "Entry",
        data() {
            return {
                height: window.screen.availHeight,
                userId: '',
                pptFlag: "Y"
            }
        },
        mounted () {
            // 解决userId为空
            this.solveUserIdNull()
        },
        created() {

        },
        methods: {
            pptMessage() {
                this.$toast.fail("您未刷卡！")
            },
            //  解决userId为空
            solveUserIdNull () {
                this.getUserId().then(res => {
                    this.userId = res
                    sessionStorage.setItem('userId', this.userId)
                })
            },
            async getUserId () {
                const reg = new RegExp('(^|&)code=([^&]*)(&|$)')
                const code = window.location.search.substring(1).match(reg)[2]
                console.log(this.$root.$root);
                // const code = 'ycH-ubn_59Ba55VgztS8_ri00BkL6wwpTmfeZN8uHXY'
                // const userID = ""
                await getUserIdInfo(code, this.$root.userId).then(res => {
                    this.userId = res.data.data
                    this.$root.userId = this.userId
                })
                return this.userId
            },
            // 获取企业微信配置
            async registerWxApi () {
                await getWxJsSdkConfig().then(res => {
                    this.$wx.config({
                        beta: true,
                        debug: true,
                        appId: res.data.data.corpid,
                        timestamp: res.data.data.timestamp,
                        nonceStr: res.data.data.nonceStr,
                        signature: res.data.data.signature,
                        jsApiList: ['chooseImage', 'getLocalImgData']
                    })
                })
            },
        }
    }
</script>

<style scoped>
    @import "../assets/css/entry.css";
</style>
