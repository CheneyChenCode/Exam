<template>
  <div>
    <navigation></navigation>
    <div class="main">
      <h2 class="title">
        <span>{{ lineData.cram_name }}</span>
        <span>{{ lineData.cram_id }}</span>
      </h2>
      <ul class="sop-list">
        <li class="sop-item" v-for="(sop, index) in sopList" :key="index">
          <span class="sop-item-index">{{ index + 1 }}.</span>
          <h3 class="book-name">{{ sop.material_name }}</h3>
          <strong class="sop-item-status"
            >【{{ studyStatus(sop.prisoner_status) }}】【{{
              examStatus(sop.prisoner_status)
            }}】</strong
          >
          <div class="btns">
            <el-button
              v-for="(btn, indexB) in setBtns(sop.prisoner_status)"
              :key="indexB"
              :disabled="btn.disabled"
              :type="btn.type"
              @click="btn.click(sop)"
              >{{ btn.title }}>>></el-button
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import navigation from "../components/nav.vue";
import { mapGetters } from "vuex";
import api from "@/api";
import http from "@/https";
import rolesConfig from "../config";
export default {
  components: {
    navigation,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
      lineData: "getLineData",
    }),
  },
  data() {
    return {
      sopList: [],
      btns: [
        { title: "学习", type: "primary", disabled: false, click: this.study },
        { title: "考试", type: "primary", disabled: false, click: this.refund },
      ],
    };
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.tableConfig = rolesConfig[val.role].tableAddConfig;
        }
      },
      deep: true,
      immediate: true,
    },
    lineData: {
      handler(val) {
        if (Object.keys(val).length) {
          this.selectLearningSop();
        } else {
          this.$router.go(-1);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /**
     * @description:获取学习SOP列表
     * @param {}
     * @return {}
     */
    async selectLearningSop() {
      const config = {
        method: "get",
        url: api.selectLearningSop,
        data: {
          cram_id: this.lineData.cram_id,
          prisoner: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.sopList = res.data;
      }
    },

    /**
     * @description:设置按钮
     * @param {}
     * @return {}
     */
    setBtns(status) {
      const btnsStatus = {
        1: [
          {
            title: "学习",
            type: "primary",
            disabled: false,
            click: this.study,
          },
          { title: "考试", type: "info", disabled: true, click: this.refund },
        ],
        2: [
          {
            title: "学习",
            type: "primary",
            disabled: false,
            click: this.study,
          },
          {
            title: "考试",
            type: "primary",
            disabled: false,
            click: this.refund,
          },
        ],
        3: [
          {
            title: "学习",
            type: "primary",
            disabled: false,
            click: this.study,
          },
          { title: "考试", type: "info", disabled: true, click: this.refund },
        ],
      };
      return btnsStatus[status] || btnsStatus["1"];
    },
    /**
     * @description: 学习
     * @param {}
     * @return {}
     */
    studyStatus(status) {
      switch (status) {
        case "1":
          return "未学习";
        case "2":
          return "已学习";
        case "3":
          return "已学习";
        default:
          return "未学习";
      }
    },

    /**
     * @description: 考试
     * @param {}
     * @return {}
     */
    examStatus(status) {
      switch (status) {
        case "1":
          return "未考试";
        case "2":
          return "未考试";
        case "3":
          return "已考试";
        default:
          return "未考试";
      }
    },

    /**
     * @description:去学习
     * @param {}
     * @return {}
     */
    study() {
      this.$router.push({
        path: "/studyCenter/examCourseList",
      });
    },

    /**
     * @description:去考试
     * @param {}
     * @return {}
     */
    refund() {
      this.$router.push({
        path: "/testCenter/noBeginTest",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 60px;
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    span {
      margin: 0 15px;
    }
  }
  .sop-list {
    display: flex;
    justify-self: center;
    flex-direction: column;
    margin-top: 50px;
  }
  .sop-item {
    display: flex;
    justify-content: center;
    flex-direction: row;
    line-height: 40px;
    margin-bottom: 30px;
    .book-name {
      width: 600px;
      font-size: 18px;
      font-weight: bold;
    }
    .sop-item-index {
      font-size: 18px;
      font-weight: bold;
    }
    .sop-item-status {
      font-size: 18px;
      font-weight: bold;
    }
    .btns {
      margin-left: 20px;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
