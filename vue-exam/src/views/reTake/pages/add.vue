<template>
  <div class="wrapper">
    <component :is="activeComponent"></component>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import hrComponents from "../components/hr.vue";
import qaComponents from "../components/qa.vue";
import tutorComponents from "../components/tutor.vue";
import studentComponents from "../components/student.vue";
export default {
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
    }),
  },
  data() {
    return {
      tableConfig: [],
      pages: {
        size: 10, //每页数据条数，非必须
        total: 0, // 总数据条数，必须
        current: 1, // 当前页数，必须
      },
      condition: {}, //查询条件
      tableData: [], //表格数据
      role: "",
      gathers: {
        hr: hrComponents,
        qa: qaComponents,
        tutor: tutorComponents,
        student: studentComponents,
      },
      activeComponent: "",
      isClass: this.$route.query.isClass,
    };
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.activeComponent = this.isClass
            ? this.gathers[this.isClass]
            : this.gathers[val.role];
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
