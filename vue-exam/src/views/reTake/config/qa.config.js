import api from "@/api";
import { teacherMenu } from "./../components/nav.config";
const qa = {
  role: "qa",
  role_id: "94",
  tableListConfig: [
    { prop: "id", label: "序号" },
    { prop: "cram_name", label: "主题" },
    { prop: "cram_id", label: "补习班期别" },
    { prop: "start_time", label: "上课开始时间" },
    { prop: "end_time", label: "上课截止时间" },
    { prop: "tutor", label: "班主任" },
    { prop: "cram_status", label: "节点", slot: "cram_status" },
    { prop: "studentsProgression", label: "学员学习进度" },
    { prop: "operate", label: "操作", slot: "operate" },
  ],
  tableAddConfig: [
    { selection: true },
    { prop: "id", label: "No" },
    { prop: "prisoner", label: "工号", slot: "entry" },
    { prop: "prisonser_name", label: "姓名" },
    { prop: "prisonser_department", label: "部门" },
    { prop: "prisonser_job", label: "职位" },
    { prop: "jail_reason", label: "加入补习班原因", slot: "reason" },
    { prop: "operate", label: "操作", slot: "operate" },
  ],
  inquire: {
    cram_id: {
      title: "期别：",
      type: "searchSelect",
      key: "cram_id",
      value: "",
    },
    start_time: {
      title: "开始上课时间：",
      type: "timePick",
      key: "start_time",
      value: "",
    },
    end_time: {
      title: "上课截止时间：",
      type: "timePick",
      value: "",
      key: "end_time",
    },
    cram_status: {
      title: "节点:",
      type: "select",
      key: "cram_status",
      options: [
        { value: 1, label: "人事" },
        { value: 2, label: "稽查组" },
        { value: 3, label: "班主任" },
        { value: 4, label: "学员" },
        { value: 5, label: "已结课" },
      ],
      value: "",
    },
  },
  inquireProt: api.hrGetRecord,
  saveProt: api.saveAttendCramStudentsInfobyAudit,
  addList: {
    cram_id: {
      key: "cram_id",
      title: "上课期别:",
      type: "text",
      value: "",
    },
    start_time: {
      key: "start_time",
      title: "上课开始时间:",
      type: "timePick",
      value: "",
      verify: /\d{4}-\d{2}-\d{2}/,
    },
    end_time: {
      key: "end_time",
      title: "上课截止时间:",
      type: "timePick",
      value: "",
      verify: /\d{4}-\d{2}-\d{2}/,
    },
    cram_name: {
      key: "cram_name",
      title: "补习班主题:",
      type: "input",
      value: "",
      verify: /^[\s\S]*.*[^\s][\s\S]*$/,
    },
    cram_location: {
      key: "cram_location",
      title: "上课地点:",
      type: "input",
      value: "6号楼行政楼3楼质量补习班",
      verify: /^[\s\S]*.*[^\s][\s\S]*$/,
    },
    tutor: {
      key: "tutor",
      title: "班主任:",
      type: "select",
      verify: /^[\s\S]*.*[^\s][\s\S]*$/,
      options: teacherMenu,
    },
    reject_reason: {
      key: "reject_reason",
      title: "退回原因:",
      type: "textarea",
      value: "",
      status: true,
      disabled: true,
    },
  },
};

export { qa };
