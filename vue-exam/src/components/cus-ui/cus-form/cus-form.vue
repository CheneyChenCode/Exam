<script>
import cusSelection from "@/components/cus-ui/cus-select/cus-select";
import cusRadio from "@/components/cus-ui/cus-radio/cus-radio";
import cusCheckbox from "@/components/cus-ui/cus-checkbox/cus-checkbox";
import { cusRules } from "./index";
export default {
  name: "cus-form",
  inheritAttrs: false,
  components: {
    cusSelection,
    cusRadio,
    cusCheckbox,
  },
  props: {
    formDisposition: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({ name: "" }),
    },
  },
  model: {
    prop: "form",
    event: "change",
  },
  data() {
    return {
      rules: {},
      froms: {
        resource: "",
      },
    };
  },
  created() {
    this.setFormOptions();
    this.setFormRules();
  },
  watch: {
    form: {
      handler: function (nv) {
        this.$emit("change", nv);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    setFormOptions() {
      this.formDisposition.formItems.forEach((item) => {
        const defaultValue =
          item?.rule && item?.options ? item.options[0].value : "";
        this.$set(this.form, item.prop, defaultValue);
      });
    },
    setFormRules() {
      this.formDisposition.formItems.forEach((item) => {
        if (!item?.rule) return false;
        if (Array.isArray(item.rule)) {
          this.$set(this.rules, item.prop, item.rule);
        } else {
          const triggers = {
            input: "blur",
            radio: "change",
            checkbox: "change",
            select: "change",
          };
          this.$set(this.rules, item.prop, [
            {
              validator: this.getCheckFn(item.rule),
              trigger: triggers[item.type] || "change",
              required: true,
            },
          ]);
        }
      });
    },
    getCheckFn(type) {
      return cusRules[type];
    },
    attrsFormat(attr) {
      return attr.replace(/-[a-z]/g, function (a, b) {
        return b === 0 ? a.replace("-", "") : a.replace("-", "").toUpperCase();
      });
    },
  },
  render() {
    const { formItems } = this.formDisposition;
    const element = {
      select: (args) => {
        const { value, prop, options } = args[0];
        return (
          <cusSelection
            v-model={this.form[prop]}
            options={options}
            placeholder={`请选择${value}`}
          />
        );
      },
      input: (args) => {
        const { value, prop } = args[0];
        return (
          <el-input v-model={this.form[prop]} placeholder={`请输入${value}`} />
        );
      },
      radio: (args) => {
        const { prop, options } = args[0];
        return (
          <cus-radio v-model={this.form[prop]} options={options}></cus-radio>
        );
      },
      checkbox: (args) => {
        const { prop, options } = args[0];
        return (
          <cus-checkbox
            v-model={this.form[prop]}
            options={options}
          ></cus-checkbox>
        );
      },
    };
    const getElement = (type, ...args) =>
      Reflect.has(element, type)
        ? element[type](args)
        : console.error(
            `type类型错误，请检查是否有该类型或组件未预设该类型，请使用插槽`
          );
    const elFormItems = formItems.map((item) => {
      const { prop, value } = item;
      if (item?.slot) {
        return (
          <el-form-item label={value} prop={prop}>
            {this.$scopedSlots[item.slot](item)}
          </el-form-item>
        );
      } else {
        return (
          <el-form-item label={value} prop={prop}>
            {getElement(item.type, item)}
          </el-form-item>
        );
      }
    });
    const elForm = (
      <el-form
        {...{ props: { model: this.form } }}
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        ref={this.formDisposition.formName}
        rules={this.rules}
      >
        {elFormItems}
      </el-form>
    );
    return elForm;
  },
};
</script>
