const constants = {
  state: {
    constants: {
      PAPER_TYPE: { 1: "公司", 2: "部门", 3: "岗位", 4: "补习班" },
      PAPER_RULE_TYPE: { 1: "随机试卷", 2: "固定试卷" },
      QUEST_TYPE: { 1: "单选题", 2: "多选题", 3: "判断题", 4: "填空题" },
      TEST_STATE: { 0: "未开始", 1: "考试中", 2: "已结束" },
      TEST_TYPE: {
        1: "管理员发起正常考试",
        2: "管理员发起补考",
        3: "个人发起补考",
      },
      COURSE_STATE: { 0: "未开始", 1: "进行中", 2: "已结束" },
      LOCATION_LIST: ["6号楼行政楼3楼质量补习班", "230"],
      STUDY_STATE: { 0: "未学习", 1: "学习中", 2: "已学习" },
      COURSE_TEST_STATE: { 0: "未考试", 1: "考试中", 2: "已考试" },
      COURSE_SLIDE_TIME: 10,
    },
  },
  getters: {
    constants: (state) => state.constants,
  },
};

export default constants;
