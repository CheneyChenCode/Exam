<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="inquires">
        <template v-if="Object.keys(inquire).length">
          <div v-for="(value, key) in inquire" :key="key" class="inquires-item">
            <template v-if="value.type === 'timePick'">
              <el-form-item :label="value.title">
                <cus-timePick
                  v-model="form[value.key]"
                  kind="date-picker"
                  clearable
                />
              </el-form-item>
            </template>
            <template v-if="value.type === 'select'">
              <el-form-item :label="value.title">
                <cus-select
                  :options="value.options"
                  clearable
                  v-model="form[value.key]"
                  value-format="yyyy-MM-dd"
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
          </div>
        </template>
        <div class="inquires-item inquires-item--last">
          <el-button v-has="'inquire'" type="primary" v-on="$listeners"
            >查询</el-button
          >
        </div>
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
        return this.role ? this.rolesConfig[this.role].inquire : {};
      },
      set() {
        return this.role ? this.rolesConfig[this.role].inquire : {};
      },
    },
  },
  watch: {
    inquire: {
      handler(nv) {
        if (nv) {
          Object.values(this.inquire).forEach((item) => {
            this.$set(this.form, item.key, "");
            this.$emit("input", this.form);
          });
        }
      },
      deep: true,
      immediate: true,
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
}
</style>
