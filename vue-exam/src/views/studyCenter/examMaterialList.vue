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
        <el-breadcrumb-item>教材列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="120"></el-table-column>
      <el-table-column
        prop="MATERIAL_ID"
        label="教材编号"
        width="300"
      ></el-table-column>
      <el-table-column prop="MATERIAL_NAME" label="教材名称"></el-table-column>
      <el-table-column
        prop="slideProgress"
        label="幻灯片进度"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="mediaProgress"
        label="视频进度"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.SLIDE_PAGE && scope.row.SLIDE_PATH"
            type="primary"
            @click="playSlide(scope.row)"
            size="mini"
            >播放幻灯片</el-button
          >
          <el-button
            v-if="scope.row.MEDIA_LENGTH && scope.row.MEDIA_PATH"
            @click="playMedia(scope.row)"
            size="mini"
            >播放视频</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/https";
import { mapGetters } from "vuex";
export default {
  name: "examMaterialList",
  computed: {
    ...mapGetters({
      user: "userInfo",
    }),
  },
  data() {
    return {
      course_id: null,
      tableData: [],
    };
  },
  created() {
    this.course_id = this.$route.query.course_id;
  },
  watch: {
    user: {
      handler(nv) {
        if (Object.keys(nv).length) {
          this.getCourseMaterialList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/studyCenter/examCourseList" });
    },
    async getCourseMaterialList() {
      const config = {
        url: "/examCourse/getCourseMaterialList",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      if (res.code == 1000) {
        this.tableData = res.data;
      }
    },
    async verifyCardBeforePlay() {
      const config = {
        url: "/examCourse/verifyCardBeforePlay",
        method: "get",
        data: {
          COURSE_ID: this.$route.query.course_id,
          STUDENT: this.$store.getters.userInfo.employ_id,
        },
      };
      await http(config);
    },
    playSlide(row) {
      if (!row.SLIDE_PAGE || !row.SLIDE_PATH) {
        this.$message.error("无幻灯片！");
        return false;
      }
      this.verifyCardBeforePlay().then(() => {
        this.$router.push({
          path: "/studyCenter/slidePlay",
          query: {
            course_id: this.course_id,
            material_id: row.MATERIAL_ID,
            material_version: row.MATERIAL_VERSION,
          },
        });
      });
    },
    playMedia(row) {
      if (!row.MEDIA_LENGTH || !row.MEDIA_PATH) {
        this.$message.error("无视频！");
        return false;
      }
      this.verifyCardBeforePlay().then(() => {
        this.$router.push({
          path: "/studyCenter/mediaPlay",
          query: {
            course_id: this.course_id,
            material_id: row.MATERIAL_ID,
            material_version: row.MATERIAL_VERSION,
          },
        });
      });
    },
  },
};
</script>
