<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getWxJsSdkConfig } from './api/get.js'
export default {
  name: 'app',
  mounted() {
    this.registerWxApi()
  },
  methods: {
    async registerWxApi () {
      await getWxJsSdkConfig().then(res => {
        this.$wx.config({
          beta: true,
          debug: false,
          appId: res.data.data.corpid,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: ['chooseImage', 'getLocalImgData']
        })
      })
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
