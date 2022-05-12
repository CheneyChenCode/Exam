<template>
  <div>
    time{{ time }}
    <cus-timePick
      v-model="time"
      kind="date-picker"
      type="datetimerange"
      range-separator="至"
      formater="YYYY-MM-DD HH:mm:ss"
    ></cus-timePick>
  </div>
</template>
<script>
export default {
  name: "demo-timePick",
  components: {
    "cus-timePick": () =>
      import("@/components/cus-ui/cus-timePick/cus-timePick"),
  },
  data() {
    return {
      time: "",
    };
  },
};
</script>
