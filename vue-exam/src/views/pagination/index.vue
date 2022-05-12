<template>
  <div>
    {{ pages }}
    <cus-pagination v-model="pages" />
    <pre>
      <code v-text="codeData"></code>
    </pre>
  </div>
</template>

<script>
import cusPagination from "@/components/cus-ui/cus-pagination/cus-pagination";
export default {
  name: "demo-pagination",
  components: {
    cusPagination,
  },
  data() {
    return {
      pages: {
        size: 10, //每页数据条数，非必须
        total: 60, // 总数据条数，必须
        current: 1, // 当前页数，必须
      },
      codeData: `<cus-pagination v-model="pages" />
       pages: {
        size: 10, //每页数据条数，非必须
        total: 60, // 总数据条数，必须
        current: 1 // 当前页数，必须
      }
      `,
    };
  },
};
</script>
