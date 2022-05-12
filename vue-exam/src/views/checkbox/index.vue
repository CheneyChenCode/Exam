<template>
  <div>
    address{{ address }}
    <cus-checkbox v-model="address" :options="options"></cus-checkbox>
    <pre>
      <code v-text="codeData"/>
    </pre>
    addressT{{ addressT }}
    <cus-checkbox
      v-model="addressT"
      :options="optionsT"
      :itemKey="itemKey"
    ></cus-checkbox>
    <pre>
      <code v-text="codeDataT"/>
    </pre>
    addressB{{ addressB }}
    <cus-checkbox
      v-model="addressB"
      :options="options"
      type="checkbox-button"
    ></cus-checkbox>
    <pre>
      <code v-text="codeDataB"/>
    </pre>
  </div>
</template>
<script>
export default {
  name: "demo-checkbox",
  components: {
    "cus-checkbox": () =>
      import("@/components/cus-ui/cus-checkbox/cus-checkbox"),
  },
  data() {
    return {
      address: [],
      options: [
        { label: "北京-0", value: "0" },
        { label: "上海-1", value: "1" },
        { label: "广州-2", value: "2" },
        { label: "深圳-3", value: "3" },
      ],
      codeData: `
      <cus-checkbox v-model="address" :options="options"></cus-checkbox>
      options: [
        { label: "北京-0", value: "0" },
        { label: "上海-1", value: "1" },
        { label: "广州-2", value: "2" },
        { label: "深圳-3", value: "3" }
      ]
      `,
      addressT: [],
      itemKey: { label: "addressLabel", value: "addressValue" },
      optionsT: [
        { addressLabel: "北京0", addressValue: "0" },
        { addressLabel: "上海1", addressValue: "1" },
        { addressLabel: "广州2", addressValue: "2" },
        { addressLabel: "深圳3", addressValue: "3" },
      ],
      codeDataT: `
      <cus-checkbox v-model="optionsT" :options="optionsT" :itemKey="itemKey"></cus-checkbox>
      options: [
        { addressLabel: "北京", addressValue: "0" },
        { addressLabel: "上海", addressValue: "1" },
        { addressLabel: "广州", addressValue: "2" },
        { addressLabel: "深圳", addressValue: "3" }
      ]
       itemKey: { label: "addressLabel", value: "addressValue" },
      `,
      addressB: [],
      codeDataB: `
      <cus-checkbox v-model="addressB" :options="options" type="checkbox-button"></cus-checkbox>
         options: [
        { label: "北京-0", value: "0" },
        { label: "上海-1", value: "1" },
        { label: "广州-2", value: "2" },
        { label: "深圳-3", value: "3" }
      ]
      `,
    };
  },
};
</script>
