<template>
  <div class="about">
    <h1>This is an about page{{ query }}</h1>
    <router-view name="home" />
  </div>
</template>

<script>
export default {
  props: ["query"],
};
</script>
