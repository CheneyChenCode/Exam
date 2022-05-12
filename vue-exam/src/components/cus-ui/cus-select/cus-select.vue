<script>
import { modelChangeMixin, resetOptionsMixin } from "./../mixin";
export default {
  name: "cus-select",
  mixins: [modelChangeMixin, resetOptionsMixin],
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedVal: this.value,
    };
  },
  render() {
    const elOption = this.FormattingOptions.map((option, index) => (
      <el-option
        key={index}
        label={option.label}
        value={option.value}
        disabled={option?.disabled}
      />
    ));
    const elSelect = (
      <el-select
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        v-model={this.selectedVal}
        multiple={this.$attrs?.multiple}
        placeholder={this.$attrs.placeholder || "请选择"}
        filterable={this.$attrs?.filterable}
        allow-create={this.$attrs["allow-create"]}
        default-first-option={this.$attrs["default-first-option"]}
        onChange={this.handleChange}
      >
        {elOption}
      </el-select>
    );
    return elSelect;
  },
};
</script>
