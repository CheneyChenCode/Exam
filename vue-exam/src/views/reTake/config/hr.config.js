import api from "@/api";
const hr = {
  role: "hr",
  role_id: "93",
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
  saveProt: api.saveStudentInfo,
  addList: {
    jail_name: {
      key: "jail_name",
      title: "补习班主题",
      type: "textarea",
      value: "",
      disabled: false,
    },
  },
};

export { hr };
