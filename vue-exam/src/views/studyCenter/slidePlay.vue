<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        style="margin-right: 15px"
        @click="goBack"
        >返回</el-button
      >
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item>学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>播放幻灯片</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div v-if="base64List.length != 0">
      <div style="text-align: center">
        <el-button v-if="currentPage != 0" @click="lastPage">上一页</el-button>
        <el-button
          v-if="currentPage != base64List.length - 1"
          type="primary"
          @click="nextPage"
          :disabled="currentPage + 1 > readedPage && courseSlideTime != 0"
          >{{
            currentPage + 1 > readedPage && courseSlideTime != 0
              ? courseSlideTime + "s后可点击下一页"
              : "下一页"
          }}</el-button
        >
        <el-button
          v-if="
            currentPage == base64List.length - 1 &&
            readedPage < base64List.length
          "
          type="primary"
          @click="completePage"
          :disabled="currentPage + 1 > readedPage && courseSlideTime != 0"
          >{{
            currentPage + 1 > readedPage && courseSlideTime != 0
              ? courseSlideTime + "s后可点击完成"
              : "完成"
          }}</el-button
        >
        <div style="margin-top: 10px">
          {{ currentPage + 1 }}/{{ base64List.length }}
        </div>
      </div>
      <el-image
        style="width: 100%; height: 1000px"
        :src="base64List[currentPage]"
        fit="scale-down"
      ></el-image>
    </div>
  </div>
</template>

<script>
import http from "@/https";
import { mapGetters } from "vuex";
export default {
  name: "slidePlay",
  computed: {
    ...mapGetters({
      user: "userInfo",
    }),
  },
  data() {
    return {
      course_id: null,
      base64List: [],
      currentPage: null,
      readedPage: 0,
      courseSlideTime: this.$store.getters.constants.COURSE_SLIDE_TIME,
      timer: null,
    };
  },
  created() {
    this.course_id = this.$route.query.course_id;
  },
  watch: {
    user: {
      handler(nv) {
        if (Object.keys(nv).length) {
          this.getMaterialSlideImage();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  destroyed() {
    this.clearTimer();
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/studyCenter/examMaterialList",
        query: { course_id: this.course_id },
      });
    },
    async getMaterialSlideImage() {
      const config = {
        url: "/examCourse/getMaterialSlideImage",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
          MATERIAL_ID: this.$route.query.material_id,
          MATERIAL_VERSION: this.$route.query.material_version,
        },
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.base64List = res.data.base64List;
        this.readedPage = res.data.readedPage;
        if (this.readedPage == this.base64List.length) {
          this.currentPage = 0;
        } else {
          this.currentPage = res.data.readedPage;
          this.startTimer();
        }
      }
    },
    lastPage() {
      this.currentPage--;
      this.clearTimer();
    },
    nextPage() {
      if (this.readedPage < this.currentPage + 1) {
        this.readedPage = this.currentPage + 1;
        this.saveStudentMaterialSlideProgress();
      }
      this.currentPage++;
      if (this.currentPage + 1 > this.readedPage) {
        this.startTimer();
      }
    },
    completePage() {
      this.readedPage = this.currentPage + 1;
      this.saveStudentMaterialSlideProgress().then(() => {
        this.getCanTestId();
      });
    },
    startTimer() {
      this.courseSlideTime = this.$store.getters.constants.COURSE_SLIDE_TIME;
      this.timer = setInterval(() => {
        this.courseSlideTime--;
        if (this.courseSlideTime == 0) {
          this.clearTimer();
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    async saveStudentMaterialSlideProgress() {
      const config = {
        url: "/examCourse/saveStudentMaterialSlideProgress",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
          MATERIAL_ID: this.$route.query.material_id,
          MATERIAL_VERSION: this.$route.query.material_version,
          SLIDE_PROGRESS: this.readedPage,
        },
      };
      await http(config);
    },
    async getCanTestId() {
      const config = {
        url: "/examCourse/getCanTestId",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      const data = res.data;
      if (data) {
        this.$confirm("课程已学习完成, 是否进入考试？", "提示", {
          confirmButtonText: "进入考试",
          cancelButtonText: "返回",
        })
          .then(() => {
            let query = {
              testId: data.testId,
            };
            if (data.testState == 1) {
              query.routerPath = "onGoingTest";
            }
            this.$router.push({
              path: "/testCenter/testView",
              query: query,
            });
          })
          .catch(() => {
            this.goBack();
          });
      } else {
        this.goBack();
      }
    },
  },
};
</script>
