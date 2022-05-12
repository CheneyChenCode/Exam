<template>
  <div>
    <cus-form
      ref="cusFrom"
      :formDisposition="formDisposition"
      v-model="form"
      label-width="200px"
    >
      <template v-slot:city="scope">
        <cus-radio
          :type="scope.type"
          v-model="form[scope.prop]"
          :options="scope.options"
        ></cus-radio>
      </template>
      <template v-slot:province="scope">
        <cus-checkbox
          :type="scope.type"
          v-model="form[scope.prop]"
          :options="scope.options"
        ></cus-checkbox>
      </template>
      <template v-slot:desc="scope">
        <el-input :type="scope.type" v-model="form[scope.prop]"></el-input>
      </template>
    </cus-form>
    <el-button type="primary" @click="submitForm('cusFrom')"
      >立即创建</el-button
    >
  </div>
</template>
<script>
import cusForm from "@/components/cus-ui/cus-form/cus-form";
import cusRadio from "@/components/cus-ui/cus-radio/cus-radio";
import cusCheckbox from "@/components/cus-ui/cus-checkbox/cus-checkbox";
export default {
  name: "demo-form",
  components: {
    cusForm,
    cusRadio,
    cusCheckbox,
  },
  data() {
    return {
      formDisposition: {
        formName: "form",
        formItems: [
          {
            prop: "name",
            value: "活动名称",
            type: "input",
            rule: [
              { required: true, message: "请输入活动名称", trigger: "blur" },
              {
                min: 3,
                max: 5,
                message: "长度在 3 到 5 个字符",
                trigger: "blur",
              },
            ],
          },
          { prop: "email", value: "邮箱", type: "input", rule: "email" },
          { prop: "date", value: "日期", type: "input", rule: "date" },
          {
            prop: "noChineseCharacter",
            value: "排除中文",
            type: "input",
            rule: "ChineseCharacter",
          },
          {
            prop: "region",
            value: "活动区域",
            type: "select",
            options: [
              { label: "活动一", value: "0" },
              { label: "活动二", value: "1" },
            ],
            rule: [{ trigger: "change", required: true }],
          },
          {
            prop: "resource",
            value: "特殊资源",
            type: "radio",
            rule: [
              { required: true, message: "请选择活动资源", trigger: "change" },
            ],
            options: [
              { label: "线上品牌商赞助", value: "0" },
              { label: " 线下场地免费", value: "1" },
            ],
          },
          {
            prop: "city",
            value: "地址",
            type: "radio-button",
            slot: "city",
            options: [
              { label: "北京", value: "0" },
              { label: "上海", value: "1" },
            ],
          },
          {
            prop: "type",
            value: "活动性质",
            type: "checkbox",
            rule: [
              {
                required: true,
                message: "请至少选择一个活动性质",
                trigger: "change",
              },
            ],
            options: [
              { label: "美食/餐厅线上活动", value: "0" },
              { label: "地推活动", value: "1", disabled: true },
              { label: "线下主题活动", value: "2" },
              { label: "单纯品牌曝光", value: " 3" },
            ],
          },
          {
            prop: "province",
            value: "省份",
            type: "checkbox-button",
            slot: "province",
            options: [
              { label: "河南", value: "0" },
              { label: "江苏", value: "1" },
              { label: "广东", value: "2" },
            ],
          },
          {
            prop: "desc",
            value: "活动形式",
            type: "textarea",
            slot: "desc",
          },
        ],
      },
      form: {},
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].$refs[this.formDisposition.formName].validate(
        (valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        }
      );
    },
  },
};
</script>
