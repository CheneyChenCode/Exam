<template>
  <div>
    region:{{ region }}
    <cus-select :options="options" v-model="region"></cus-select>
    <pre>
      <code v-text="regionData"></code>
    </pre>
    regionT:{{ regionT }}
    <cus-select
      :options="optionsT"
      v-model="regionT"
      :itemKey="itemKey"
    ></cus-select>
    <pre>
      <code v-text="regionDataT"></code>
    </pre>
  </div>
</template>
<script>
export default {
  name: "demo-select",
  components: {
    "cus-select": () => import("@/components/cus-ui/cus-select/cus-select"),
  },
  data() {
    return {
      region: "",
      options: [
        { label: "活动一", value: "0" },
        { label: "活动二", value: "1" },
      ],
      regionData: `
      <cus-select :options="options" v-model="region"></cus-select>
         options: [
        { label: "活动一", value: "0" },
        { label: "活动二", value: "1" }
      ],
      `,
      regionT: "",
      optionsT: [
        { addressLabel: "活动一", addressValue: "0" },
        { addressLabel: "活动二", addressValue: "1" },
      ],
      itemKey: { label: "addressLabel", value: "addressValue" },
      regionDataT: `
        <cus-select :options="optionsT" v-model="regionT" :itemKey="itemKey"></cus-select>
        optionsT: [
        { addressLabel: "活动一", addressValue: "0" },
        { addressLabel: "活动二", addressValue: "1" }
      ],
       itemKey: { label: "addressLabel", value: "addressValue" },
      `,
    };
  },
};
</script>
