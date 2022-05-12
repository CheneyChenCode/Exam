<template>
  <div>
    resource:{{ resource }}
    <cus-radio v-model="resource" :options="options"></cus-radio>
    <pre>
      <code v-text="resourceData"></code>
    </pre>
    resourceT:{{ resourceT }}
    <cus-radio
      v-model="resourceT"
      :options="optionsT"
      :itemKey="itemKey"
    ></cus-radio>
    <pre>
      <code v-text="resourceDataT"></code>
    </pre>
    resourceB:{{ resourceB }}
    <cus-radio
      v-model="resourceB"
      :options="options"
      type="radio-button"
    ></cus-radio>
    <pre>
      <code v-text="resourceDataB"></code>
    </pre>
  </div>
</template>
<script>
export default {
  name: "demo-radio",
  components: {
    "cus-radio": () => import("@/components/cus-ui/cus-radio/cus-radio"),
  },
  data() {
    return {
      resource: "",
      options: [
        { label: "线上品牌商赞助", value: "0" },
        { label: " 线下场地免费", value: "1" },
      ],
      resourceData: `
      <cus-radio v-model="resource" :options="options"></cus-radio>
       options: [
        { label: "线上品牌商赞助", value: "0" },
        { label: " 线下场地免费", value: "1" }
      ],
      `,
      resourceT: "",
      optionsT: [
        { addressLabel: "线上品牌商赞助", addressValue: "0" },
        { addressLabel: " 线下场地免费", addressValue: "1" },
      ],
      itemKey: { label: "addressLabel", value: "addressValue" },
      resourceDataT: `
          <cus-radio v-model="resourceT" :options="optionsT" :itemKey="itemKey"></cus-radio>
        optionsT: [
        { addressLabel: "线上品牌商赞助", addressValue: "0" },
        { addressLabel: " 线下场地免费", addressValue: "1" }
      ],
          itemKey: { label: "addressLabel", value: "addressValue" },
      `,
      resourceB: "",
      resourceDataB: `
        <cus-radio v-model="resourceB" :options="options" type="radio-button"></cus-radio>
        options: [
        { label: "线上品牌商赞助", value: "0" },
        { label: " 线下场地免费", value: "1" }
      ]
      `,
    };
  },
};
</script>
