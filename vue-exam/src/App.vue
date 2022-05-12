<template>
  <div id="app">
    <router-view name="top" />
    <router-view name="left" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./../public/static/css/reset.css";
#app {
  display: flex;
  position: relative;
  padding-top: 53px;
}
</style>
