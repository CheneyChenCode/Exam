<script>
import { modelChangeMixin, resetOptionsMixin } from "./../mixin";
export default {
  name: "cus-radio",
  mixins: [modelChangeMixin, resetOptionsMixin],
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "radio",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      radioVal: this.value,
    };
  },
  render() {
    const elements = {
      radio: this.FormattingOptions.map((option) => (
        <el-radio {...{ attrs: this.$attrs }} label={option.value}>
          {option.label}
        </el-radio>
      )),
      "radio-button": this.FormattingOptions.map((option) => (
        <el-radio-button {...{ attrs: this.$attrs }} label={option.value}>
          {option.label}
        </el-radio-button>
      )),
    };
    const getElement = () => elements[this.type];
    const elRadioGroup = (
      <el-radio-group
        v-model={this.radioVal}
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        onChange={this.handleChange}
      >
        {getElement()}
      </el-radio-group>
    );
    return elRadioGroup;
  },
};
</script>
