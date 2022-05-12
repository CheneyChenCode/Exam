<template>
  <header class="cus-home-top">
    <!-- <img v-failImg="isShow" alt="" class="cus-home_logo" /> -->
    <!-- <img v-loadImg="isShow" alt="" class="cus-home_logo" /> -->
    华天网络学堂考试系统
    <div class="login-info">
      姓名：{{ $store.getters.userInfo.name }}， 工号：{{
        $store.getters.userInfo.employ_id
      }}， 部门：{{ $store.getters.userInfo.department }}
      <div class="login-info-item cus-point" @click="toLogin">
        <i class="el-icon-switch-button cus-info"></i>
        <span>退出</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      window.location.replace(process.env.VUE_APP_LOGIN_URL);
    },
  },
};
</script>

<style lang="scss" scoped>
.cus-home-top {
  height: 52px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .cus-home_logo {
    height: 46px;
    width: auto;
  }
  .login-info {
    font-size: 14px;
    display: flex;
    align-items: center;
    &-item {
      padding: 0 10px;
    }
  }
  .cus-info {
    font-size: 18px;
    margin-right: 10px;
  }
  .cus-point {
    cursor: pointer;
  }
}
</style>
