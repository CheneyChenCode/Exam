const cusMixin = {
  props: {
    disposition: {
      //配置
      type: [Array, Object],
      default: () => [],
    },
    daten: {
      // 数据
      type: [Array, Object],
      default: () => [],
    },
  },
};
const modelChangeMixin = {
  props: {
    value: {
      type: [Array, String, Object, Number],
      default: () => [],
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
const modelBlurMixin = {
  model: {
    prop: "value",
    event: "blur",
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
const resetOptionsMixin = {
  props: {
    itemKey: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    FormattingOptions() {
      if (this.itemKey && Object.keys(this.itemKey).length === 0) {
        return this.options;
      } else {
        return this.options.map((option) => this.resetDataFormat(option));
      }
    },
  },
  methods: {
    /**
     * @description: 格式化数据
     * @param {Object} 需要格式化的数据
     * @return {Object} 格式化后的数据
     */
    resetDataFormat(data) {
      const option = Object.create(null);
      Object.keys(this.itemKey).forEach((key) => {
        Reflect.set(option, key, data[this.itemKey[key]]);
      });
      return option;
    },
  },
};

export { cusMixin, modelChangeMixin, modelBlurMixin, resetOptionsMixin };
