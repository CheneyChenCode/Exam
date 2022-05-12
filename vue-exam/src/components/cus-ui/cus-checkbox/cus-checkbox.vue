<script>
import { modelChangeMixin, resetOptionsMixin } from "./../mixin";
export default {
  name: "cus-checkbox",
  mixins: [modelChangeMixin, resetOptionsMixin],
  props: {
    type: {
      type: String,
      default: "checkbox",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkboxValue: Array.isArray(this.value)
        ? this.value
        : this.value.split(""),
    };
  },
  render() {
    const elements = {
      checkbox: this.FormattingOptions.map((option) => (
        <el-checkbox
          {...{ attrs: this.$attrs }}
          label={option.value}
          name="checkboxValue"
          disabled={option.disabled}
        >
          {option.label}
        </el-checkbox>
      )),
      "checkbox-button": this.FormattingOptions.map((option) => (
        <el-checkbox-button
          {...{ attrs: this.$attrs }}
          label={option.value}
          name="checkboxValue"
        >
          {option.label}
        </el-checkbox-button>
      )),
    };
    const getElement = () => elements[this.type];
    const elCheckboxGroup = (
      <el-checkbox-group
        v-model={this.checkboxValue}
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        onChange={this.handleChange}
        min={this.$attrs.min}
        max={this.$attrs.max}
      >
        {getElement}
      </el-checkbox-group>
    );
    return elCheckboxGroup;
  },
};
</script>
