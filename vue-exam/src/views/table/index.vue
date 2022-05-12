<template>
  <cusElTable
    :disposition="tableConfig"
    @selection-change="handleSelectionChange"
    :daten="tableData"
  >
    <template v-slot:id="scope"><el-input v-model="scope.id" /></template>
    <template v-slot:domicile="scope"
      ><cus-selection
        v-model="scope.domicile"
        :options="options"
        :itemKey="itemKey"
    /></template>
    <template v-slot:address="scope">
      <cus-selection
        v-model="scope.address"
        :options="options"
        :itemKey="itemKey"
        multiple
      />
    </template>
  </cusElTable>
</template>
<script>
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import cusSelection from "@/components/cus-ui/cus-select/cus-select";
export default {
  name: "demo-table",
  components: {
    cusElTable,
    cusSelection,
  },
  data() {
    return {
      tableConfig: [
        { selection: true },
        { prop: "id", label: "ID", width: "200", slot: "id" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "aliasName", label: "曾用名" },
        { prop: "birthday", label: "出生日期" },
        { prop: "job", label: "职业" },
        { prop: "domicile", label: "籍贯", slot: "domicile" },
        { prop: "email", label: "邮箱" },
        { prop: "mobile", label: "电话" },
        { prop: "address", label: "地址", slot: "address" },
      ],
      tableData: [],
      options: [
        { addressLabel: "北京", addressValue: "北京" },
        { addressLabel: "上海", addressValue: "上海" },
        { addressLabel: "广州", addressValue: "广州" },
        { addressLabel: "深圳", addressValue: "深圳" },
      ],
      itemKey: { label: "addressLabel", value: "addressValue" },
      domiciles: [
        { label: "北京", value: "北京" },
        { label: "上海", value: "上海" },
        { label: "广州", value: "广州" },
        { label: "深圳", value: "深圳" },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.tableData = [
        {
          id: "one",
          name: "llh",
          age: "18",
          aliasName: "lf",
          birthday: "2003",
          job: "开发",
          domicile: "上海",
          email: "163@116.com",
          mobile: "18682434722",
          address: ["北京"],
        },
        {
          id: "two",
          name: "llh",
          age: "18",
          aliasName: "lf",
          birthday: "2003",
          job: "开发",
          domicile: "上海",
          email: "163@116.com",
          mobile: "18682434722",
          address: ["北京"],
        },
      ];
    }, 2000);
  },
  methods: {
    /**
     * @description:table选中事件
     */
    handleSelectionChange(value) {
      console.log(value);
    },
  },
};
</script>
