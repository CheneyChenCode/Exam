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
        <el-breadcrumb-item>播放视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div>
      <video-player
        v-if="mediaUrl"
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        style="width: 70%; height: 600px"
        @ready="playerReadied"
        @ended="onPlayerEnded($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        :class="complete ? 'complete' : 'uncomplete'"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
import http from "@/https";
import { mapGetters } from "vuex";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  name: "mediaPlay",
  components: {
    videoPlayer,
  },
  computed: {
    ...mapGetters({
      user: "userInfo",
    }),
  },
  data() {
    return {
      course_id: null,
      mediaUrl: null,
      mediaLength: 0,
      currentTime: 0,
      playerOptions: {
        playbackRates: [1.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      complete: false,
    };
  },
  created() {
    this.course_id = this.$route.query.course_id;
  },
  watch: {
    user: {
      handler(nv) {
        if (Object.keys(nv).length) {
          this.getMaterialMedia();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/studyCenter/examMaterialList",
        query: { course_id: this.course_id },
      });
    },
    async getMaterialMedia() {
      const config = {
        url: "/examCourse/getMaterialMediaPath",
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
        let mediaPath = res.data.media_path;
        mediaPath = mediaPath.replace("D:\\EXAM_MATERIAL", "/EXAM_MATERIAL");
        let name = mediaPath.substring(mediaPath.lastIndexOf("\\") + 1);
        this.mediaUrl =
          mediaPath.substring(0, mediaPath.lastIndexOf("\\") + 1) +
          encodeURI(name);
        this.playerOptions.sources[0].src = this.mediaUrl;
        this.mediaLength = res.data.media_length;
        if (res.data.media_progress != res.data.media_length) {
          this.complete = false;
          this.currentTime = res.data.media_progress;
        } else {
          this.complete = true;
          this.currentTime = 0;
        }
      }
    },
    playerReadied(player) {
      player.currentTime(this.currentTime);
    },
    // 视频播完回调
    onPlayerEnded() {
      if (!this.complete) {
        this.complete = true;
        this.$message.success("播放完成！");
        this.saveStudentMaterialMediaProgress(this.mediaLength).then(() => {
          this.getCanTestId();
        });
      }
    },
    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      let currentTime = player.cache_.currentTime;
      if (parseInt(currentTime) != this.currentTime) {
        this.currentTime = parseInt(currentTime);
        if (this.currentTime != 0 && this.currentTime % 60 == 0) {
          if (!this.complete) {
            this.saveStudentMaterialMediaProgress(this.currentTime);
          }
        }
      }
    },
    async saveStudentMaterialMediaProgress(MEDIA_PROGRESS) {
      const config = {
        url: "/examCourse/saveStudentMaterialMediaProgress",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
          MATERIAL_ID: this.$route.query.material_id,
          MATERIAL_VERSION: this.$route.query.material_version,
          MEDIA_PROGRESS: MEDIA_PROGRESS,
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
      }
    },
  },
};
</script>
<style>
.uncomplete .vjs-progress-control {
  pointer-events: none !important;
}
.complete .vjs-progress-control {
  pointer-events: auto !important;
}
</style>
