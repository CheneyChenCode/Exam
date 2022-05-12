<script>
import { cusMixin } from "../mixin";
export default {
  name: "cus-table",
  inheritAttrs: false,
  mixins: [cusMixin],
  data() {
    return {
      loading: false, //table的loa
    };
  },
  computed: {
    //不要直接操控props传入的数据，否则会触发父组件的updated钩子函数，刷新页面
    // 如果操作，请控制linedata
    linedata: {
      get() {
        return this.daten;
      },
      set(value) {
        return value;
      },
    },
  },
  watch: {
    daten(nv) {
      if (nv) {
        this.linedata = nv;
      }
    },
  },
  methods: {
    /**
     * @description:检测是否有插槽
     * @return {Boolen}
     */
    checkSlot(slot, $$slot) {
      if (slot && $$slot) {
        return true;
      } else if (slot && !$$slot) {
        console.error("配置中使用了插槽,但是未输入插槽元素");
        return false;
      } else {
        return false;
      }
    },
  },
  render() {
    const elTableColumns = this.disposition.map((disposition, index) => {
      if (disposition.selection) {
        return (
          <el-table-column
            key={index}
            type="selection"
            width={disposition.width || 55}
          ></el-table-column>
        );
      } else {
        return (
          <el-table-column
            key={index}
            label={disposition.label}
            width={disposition.width || ""}
            fixed={disposition.fixed || ""}
            {...{
              scopedSlots: {
                default: (props) => {
                  if (
                    this.checkSlot(
                      disposition.slot,
                      this.$scopedSlots[disposition.slot]
                    )
                  ) {
                    return this.$scopedSlots[disposition.slot](props.row);
                  } else {
                    return <span>{props.row[disposition.prop]}</span>;
                  }
                },
              },
            }}
          ></el-table-column>
        );
      }
    });
    const elTable = (
      <el-table
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
        data={this.linedata}
        on={this.$listeners}
        v-loading={this.loading}
      >
        {elTableColumns}
      </el-table>
    );
    return elTable;
  },
};
</script>
