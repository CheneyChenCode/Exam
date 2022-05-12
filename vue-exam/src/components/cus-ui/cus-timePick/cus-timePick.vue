<script>
import dayjs from "dayjs";
export default {
  props: {
    kind: {
      type: String,
      default: "time-picker",
    },
    value: {
      type: [String, Date, Array],
      default: "",
    },
    formater: {
      type: String,
      default: "YYYY-MM-DD",
    },
  },
  data() {
    return {
      pickerValue: this.value,
    };
  },
  methods: {
    handleChange(nv) {
      const result = Array.isArray(nv)
        ? nv.map((item) => this.formaterTime(item))
        : this.formaterTime(nv);
      this.$emit("input", result);
    },
    formaterTime(value) {
      return dayjs(value).format(this.formater);
    },
  },
  render() {
    const timePickerTypes = {
      "time-select": (
        <el-time-select
          v-model={this.pickerValue}
          onChange={this.handleChange}
          {...{ attrs: this.$attrs }}
        ></el-time-select>
      ),
      "time-picker": (
        <el-time-picker
          v-model={this.pickerValue}
          onChange={this.handleChange}
          {...{ attrs: this.$attrs }}
        ></el-time-picker>
      ),
      "date-picker": (
        <el-date-picker
          v-model={this.pickerValue}
          onChange={this.handleChange}
          {...{ attrs: this.$attrs }}
        ></el-date-picker>
      ),
      "dateTime-picker": (
        <el-date-picker
          type="datetime"
          v-model={this.pickerValue}
          onChange={this.handleChange}
          {...{ attrs: this.$attrs }}
        ></el-date-picker>
      ),
    };
    const timePick = timePickerTypes[this.kind];
    return timePick;
  },
};
</script>
