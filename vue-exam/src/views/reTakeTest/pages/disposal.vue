<template>
  <div>
    <navigation :role="role" @click="submitHandle">
      <el-button size="small" type="success" @click="submit('save')"
        >保存</el-button
      >
    </navigation>
    <add-list
      :data="lineData"
      :rolesConfig="rolesConfig"
      :role="currentRole.role"
    >
      <el-form-item label="评委材料上传">
        <el-upload
          class="upload-demo"
          action=""
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          :on-change="handleChange"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span
            v-download="lineData.file_path"
            v-if="lineData.file_path"
            class="current"
            >{{ lineData.file_path }}</span
          >
        </el-upload>
      </el-form-item>
    </add-list>
    <cus-el-able
      :disposition="tableConfig"
      :daten="tableData"
      style="width: 100%"
    >
      <template v-slot:is_complete="scope">
        <span>{{ scope.is_complete | conversion }}</span>
      </template>
      <template v-slot:operate="scope">
        <div class="buttons">
          <el-upload
            class="upload-demo"
            action=""
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :on-change="
              (file, fileList) => handleChangeSingle(file, fileList, scope)
            "
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <el-button
              v-if="scope.file_path"
              v-download="scope.file_path"
              class="current"
              size="small"
              >附件下载</el-button
            >
          </el-upload>
        </div>
      </template>

      <template v-slot:reply="scope">
        <el-input v-model="scope.reply_score" />
      </template>
      <template v-slot:is_complete="scope">
        <el-select v-model="scope.is_complete" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template v-slot:sop="scope">
        <el-button size="mini" @click="searchSop(scope)">课程详情</el-button>
      </template>
    </cus-el-able>
    <cus-dialog
      title="结班确认"
      :dialogVisible.sync="dialogVisible"
      :btns="btns"
    >
      <span slot="main" class="com-title"
        >经检测，当前评委材料、学员成绩及学员答辩材料均已录入，请确认是否结班</span
      >
    </cus-dialog>
    <cus-dialog title="SOP详情" :dialogVisible.sync="refundedVisible">
      <div slot="main" class="main-cont">
        <ul class="sop">
          <li v-for="(sop, index) in sopList" :key="index" class="sop-item">
            {{ index + 1 }}.{{ sop.material_name }}
          </li>
        </ul>
      </div>
    </cus-dialog>
  </div>
</template>
<script>
import cusElTable from "@/components/cus-ui/cus-tables/cus-table";
import cusElDialog from "@/components/cus-ui/cus-dialog/cus-dialog";
import http from "@/https";
import { mapGetters } from "vuex";
import navigation from "@/views/reTake/components/nav.vue";
import addList from "@/views/reTake/components/addList.vue";
import rolesConfig from "../config";
import api from "@/api";
export default {
  components: {
    "cus-el-able": cusElTable,
    navigation,
    "add-list": addList,
    "cus-dialog": cusElDialog,
  },
  computed: {
    ...mapGetters({
      currentRole: "getCurrentRole",
      lineData: "getLineData",
    }),
  },
  filters: {
    conversion(val) {
      return val ? (val === "Y" ? "是" : "否") : "";
    },
  },
  data() {
    return {
      role: "",
      tableConfig: [],
      tableData: [], //表格数据
      condition: {},
      rolesConfig: rolesConfig,
      sopList: [],
      refundedVisible: false,
      dialogVisible: false,
      btns: { ok: this.identify, cancle: this.cancleEvent },
      fileList: [],
      file: "",
      options: [
        {
          value: "Y",
          label: "是",
        },
        {
          value: "N",
          label: "否",
        },
      ],
    };
  },
  watch: {
    currentRole: {
      handler(val) {
        if (Object.keys(val).length) {
          this.role = val.role;
          this.tableConfig = this.rolesConfig[val.role].tableDisConfig;
        }
      },
      deep: true,
      immediate: true,
    },
    lineData: {
      handler(val) {
        if (Object.keys(val).length) {
          this.getList();
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
     * @description:保存
     * @param {}
     * @return {}
     */
    submitHandle() {
      this.dialogVisible = true;
    },

    /**
     * @description:确认结班
     * @param {}
     * @return {}
     */
    identify() {
      this.submit("submit");
    },
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    async getList() {
      const config = {
        method: "get",
        url: api.TestRecord,
        data: {
          jail_id: this.lineData.jail_id,
          role: this.$store.getters.userInfo.role_id,
          cram_id: this.lineData.cram_id,
          prisoner: this.$store.getters.userInfo.employ_id,
        },
      };
      const res = await http(config);
      if (res.code == 1000 && res.data) {
        this.tableData = res.data;
      }
    },
    /**
     * @description: 查询
     * @param {}
     * @return {}
     */
    searchSop(scope) {
      this.refundedVisible = true;
      this.selectLearningSop(scope);
    },
    /**
     * @description:获取学习SOP列表
     * @param {}
     * @return {}
     */
    async selectLearningSop(scope) {
      const config = {
        method: "get",
        url: api.selectLearningSop,
        data: {
          cram_id: scope.cram_id,
          prisoner: scope.prisoner,
        },
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.sopList = res.data;
      }
    },

    /**
     * @description:取消
     * @param {}
     * @return {}
     */
    cancleEvent() {
      this.refundedVisible = false;
      this.dialogVisible = false;
    },
    /**
     * @description: 上传文件
     * @param {}
     * @return {}
     */
    handleChange(file) {
      this.file = file.raw;
    },

    /**
     * @description:单个
     * @param {}
     * @return {}
     */
    handleChangeSingle(file, fileList, scope) {
      const index = this.tableData.findIndex((item) => item.id == scope.id);
      this.tableData[index].file = file.raw;
    },

    /**
     * @description: 提交
     * @param {}
     * @return {}
     */
    submit(sub) {
      const port = {
        submit: api.submitTestSorceByTutor,
        save: api.saveTestSorceByTutor,
      };
      this.submitData(port[sub]);
    },

    /**
     * @description: 提交
     * @param {}
     * @return {}
     */
    async submitData(port) {
      const formData = new FormData();
      if (this.file) formData.append("file", this.file);
      formData.append("creater", this.$store.getters.userInfo.employ_id);
      formData.append("cram_id", this.lineData.cram_id);
      this.tableData.forEach((item, index) => {
        if (item.file)
          formData.append(`studentsBasicInfo[${index}].file`, item.file);
        formData.append(`studentsBasicInfo[${index}].cram_id`, item.cram_id);
        formData.append(
          `studentsBasicInfo[${index}].prisonser_name`,
          item.prisonser_name
        );
        formData.append(`studentsBasicInfo[${index}].prisoner`, item.prisoner);
        formData.append(`studentsBasicInfo[${index}].jail_id`, item.jail_id);
        formData.append(
          `studentsBasicInfo[${index}].prisonser_department`,
          item.prisonser_department
        );
        formData.append(
          `studentsBasicInfo[${index}].total_score`,
          item.total_score
        );
        formData.append(
          `studentsBasicInfo[${index}].reply_score`,
          item.reply_score
        );
        formData.append(
          `studentsBasicInfo[${index}].is_complete`,
          item.is_complete
        );
        formData.append(`studentsBasicInfo[${index}].id`, item.id);
      });
      const config = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: port,
        data: formData,
      };
      const res = await http(config);
      if (res.code === 1000) {
        this.$message.success("提交成功");
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sop {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &-item {
    font-size: 18px;
    line-height: 40px;
    color: #333;
    margin-bottom: 10px;
  }
}
.current {
  cursor: pointer;
}

.com-title {
  font-size: 32px;
  color: #333;
  font-weight: border;
  line-height: 1.5;
}
.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
</style>
