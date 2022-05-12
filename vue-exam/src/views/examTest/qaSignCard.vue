<template>
  <div id="signCard">
    <div>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>质量补习班</el-breadcrumb-item>
        <el-breadcrumb-item>打卡签到</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <!-- 主体 -->
    <div id="main">
      <!-- 搜索 -->
      <div id="search">
        <el-form label-width="90px">
          <el-row>
            <el-col :span="4">
              <el-form-item label="补习班主题" prop="cramName">
                <el-select v-model="cramName" style="width: 100px">
                  <el-option
                    v-for="(item, index) in qaInfoList"
                    :value="item.cram_NAME"
                    :label="item.cram_NAME"
                    :key="index"
                  >
                    {{ item.cram_NAME }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" required>
                <el-date-picker
                  v-model="startRangeTime"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="startRangeTimeChange"
                  size="mini"
                ></el-date-picker>
                <div class="el-form-item__error" v-if="showStartRangTimeError">
                  请选择正确的时间
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="结束时间" required>
                <el-date-picker
                  v-model="endRangeTime"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="endRangeTimeChange"
                  size="mini"
                ></el-date-picker>
                <div class="el-form-item__error" v-if="showEndRangTimeError">
                  请选择正确的时间
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="primary" @click="searchQa">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 展示数据 -->
      <el-table
        :data="qaInfoList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        border
        id="showTable"
      >
        <el-table-column label="No." type="index"></el-table-column>
        <el-table-column prop="cram_ID" label="期别"></el-table-column>
        <el-table-column prop="cram_NAME" label="主题"></el-table-column>
        <el-table-column label="补习开始时间">
          <template slot-scope="scope">
            {{ scope.row.START_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="补习结束时间">
          <template slot-scope="scope">
            {{ scope.row.END_TIME }}
          </template>
        </el-table-column>
        <el-table-column label="节点">
          <template slot-scope="scope">
            {{ QaType(scope.row.cram_STATUS) }}
          </template>
        </el-table-column>
        <el-table-column prop="tutor_NAME" label="班主任"></el-table-column>
        <el-table-column
          prop="cram_LOCATION"
          label="补习地点"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="showQaDetail(scope.row.cram_ID, scope.row.cram_NAME)"
              size="normal"
              type="primary"
              >详情</el-button
            >
            <el-button
              @click="
                goToSignCard(
                  scope.row.cram_ID,
                  scope.row.cram_NAME,
                  scope.row.START_TIME,
                  scope.row.END_TIME
                )
              "
              size="normal"
              type="primary"
              >刷卡</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      id="footer"
    >
    </el-pagination>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import http from "@/https";
export default {
  name: "qaSignCard",
  data() {
    return {
      qaInfoList: [], // 课程列表
      pageNum: 1, // 当前页
      pageSize: 8, // 一页显示数量
      total: 0, // 总数
      startRangeTime: [], // 开始时间范围
      endRangeTime: [], // 结束时间范围
      showStartRangTimeError: false, // 开始时间范围不正确时显示
      showEndRangTimeError: false, // 结束时间范围不正确显示
      cramName: "",
    };
  },
  mounted() {
    this.getQaList();
  },
  methods: {
    // 分页下一页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 显示课程详情
    showQaDetail(cramId, cramName) {
      // 跳转详情界面
      this.$router.push({
        path: "/examTest/qaSignCardForDetail",
        query: {
          cramId: cramId,
          cramName: cramName,
        },
      });
    },
    // 前往刷卡界面
    goToSignCard(cramId, cramName, startTime, endTime) {
      this.$router.push({
        path: "/examTest/qaSignCardForUpdate",
        query: {
          cramId: cramId,
          cramName: cramName,
          startTime: startTime,
          endTime: endTime,
        },
      });
    },
    // 搜索课程
    searchQa() {
      if (this.startRangeTime.length == 0) {
        this.$message("请选择考试开始时间范围！");
        return;
      }
      if (this.endRangeTime.length == 0) {
        this.$message("请选择考试结束时间范围！");
        return;
      }
      const searchQaList = {
        url: "/GetTest/searchQa",
        method: "get",
        data: {
          cramName: this.cramName,
          startRangeTime: this.startRangeTime.join(","),
          endRangeTime: this.endRangeTime.join(","),
        },
      };
      // 搜索
      http(searchQaList).then((res) => {
        this.qaInfoList = res.data;
        this.total = this.qaInfoList.length;
        this.cramName = "";
      });
    },
    // 范围时间不正确，显示错误文本-开始时间
    startRangeTimeChange() {
      this.showStartRangTimeError =
        !this.startRangeTime || this.startRangeTime.length == 0 ? true : false;
    },
    // 范围时间不正确，显示错误文本-结束时间
    endRangeTimeChange() {
      this.showEndRangTimeError =
        !this.endRangeTime || this.endRangeTime.length == 0 ? true : false;
    },
    // 获取课程列表
    getQaList() {
      const getQaList = {
        url: "/GetTest/getQaListInNow",
        method: "get",
        data: "",
      };
      http(getQaList).then((res) => {
        this.qaInfoList = res.data;
        this.total = this.qaInfoList.length;
      });
    },
    // 显示课程类型名称
    QaType(value) {
      var s = "";
      if (value == "1") {
        s = "稽核组";
      } else if (value == "2") {
        s = "班主任";
      } else if (value == "3") {
        s = "学员";
      } else if (value == "4") {
        s = "答辩中";
      } else {
        s = "结业";
      }
      return s;
    },
  },
};
</script>
<style scoped>
.signCard {
  position: relative;
  height: 80%;
  width: 100%;
}
.main {
  position: relative;
  height: 100%;
  width: 100%;
}
.showTable {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 5%;
  z-index: 999;
  text-align: center;
  left: 10%;
}
</style>
