<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="inquires">
        <template v-if="Object.keys(inquire).length">
          <div
            v-for="(value, key) in inquire"
            :key="key"
            class="inquires-item"
            :class="[value.type === 'textarea' ? 'width-full' : '']"
          >
            <template v-if="value.type === 'timePick'">
              <el-form-item :label="value.title">
                <cus-timePick
                  v-model="form[value.key]"
                  kind="date-picker"
                  clearable
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </template>
            <template v-if="value.type === 'select'">
              <el-form-item :label="value.title">
                <cus-select
                  :options="value.options"
                  clearable
                  v-model="form[value.key]"
                />
              </el-form-item>
            </template>
            <template v-if="value.type === 'input'">
              <el-form-item :label="value.title">
                <el-input
                  v-model="form[value.key]"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
            <template
              v-if="
                value.type === 'textarea' &&
                (!value.status || (value.status && form[value.key]))
              "
            >
              <el-form-item :label="value.title">
                <el-input
                  type="textarea"
                  v-model="form[value.key]"
                  clearable
                  placeholder="请输入"
                  :disabled="value.disabled ? value.disabled : false"
                />
              </el-form-item>
            </template>
            <template v-if="value.type === 'searchSelect'">
              <el-form-item :label="value.title">
                <cus-select
                  :options="searchOptions"
                  clearable
                  filterable
                  v-model="form[value.key]"
                  remote
                  reserve-keyword
                  :remote-method="searchHandle"
                />
              </el-form-item>
            </template>
            <template v-if="value.type === 'text'">
              <el-form-item :label="value.title">
                <p class="inquires-item--text">{{ form[value.key] }}</p>
              </el-form-item>
            </template>
          </div>
          <slot></slot>
        </template>
      </div>
    </el-form>
  </div>
</template>
<script>
import api from "@/api";
import http from "@/https";
export default {
  components: {
    "cus-timePick": () =>
      import("@/components/cus-ui/cus-timePick/cus-timePick"),
    "cus-select": () => import("@/components/cus-ui/cus-select/cus-select"),
  },
  props: {
    role: {
      type: String,
      default: "",
    },
    rolesConfig: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {},
      searchOptions: [],
    };
  },
  computed: {
    inquire: {
      get() {
        return this.role ? this.rolesConfig[this.role].addList : {};
      },
      set() {
        return this.role ? this.rolesConfig[this.role].addList : {};
      },
    },
  },
  methods: {
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    async searchHandle(val) {
      const config = {
        method: "get",
        url: api.getCramList,
        data: {
          cram_id: val,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.searchOptions = res.data.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
      }
    },

    /**
     * @description:日期校验
     * @param {}
     * @return {}
     */
    validTimeChange() {
      if (new Date(this.form.start_time) > new Date(this.form.end_time)) {
        this.$message.error("开始时间不能大于结束时间");
        return false;
      }
    },
  },
  watch: {
    inquire: {
      handler(nv) {
        if (nv) {
          Object.values(this.inquire).forEach((item) => {
            if (!item.status || (item.status && this.data[item.key])) {
              const defaultValue = item.value ? item.value : "";
              this.$set(
                this.form,
                item.key,
                this.data[item.key] || defaultValue
              );
              this.$emit("input", this.form);
            }
          });
        }
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler(val) {
        if (Object.keys(val).length) {
          Object.keys(this.form).forEach((key) => {
            this.form[key] = val[key] || this.form[key];
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  updated() {
    if (!this.validTimeChange()) this.$emit("input", this.form);
  },
};
</script>

<style lang="scss" scoped>
.inquires {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .inquires-item--last {
    margin-left: auto;
  }
  .inquires-item--text {
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
    width: 217px;
  }
}
.width-full {
  width: 100%;
}
</style>
