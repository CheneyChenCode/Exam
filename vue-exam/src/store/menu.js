const menus = {
  state: {
    menu: [
      {
        MenuIndex: "examPaper",
        title: "试卷管理",
        accessRights: "1,92",
        children: [
          {
            MenuIndex: "examPaper/add",
            title: "新增",
          },
          {
            MenuIndex: "examPaper/list",
            title: "列表",
          },
        ],
      },
      {
        MenuIndex: "examTest",
        title: "考试管理",
        accessRights: "1,92",
        children: [
          {
            MenuIndex: "examTest/add",
            title: "新增",
          },
          {
            MenuIndex: "examTest/list",
            title: "列表",
          },
          {
            MenuIndex: "examTest/testSignCard",
            title: "考试打卡签到",
          },
        ],
      },
      {
        MenuIndex: "examCourse",
        title: "课程管理",
        accessRights: "1,92",
        children: [
          {
            MenuIndex: "examCourse/add",
            title: "新增",
          },
          {
            MenuIndex: "examCourse/list",
            title: "列表",
          },
          {
            MenuIndex: "examCourse/courseSignCard",
            title: "课程打卡签到",
          },
        ],
      },
      {
        MenuIndex: "studyCenter/examCourseList",
        title: "学习中心",
        accessRights: "1,92,96",
      },
      {
        MenuIndex: "reTake",
        title: "质量补习班",
        accessRights: "93,94,95,96",
        children: [
          {
            MenuIndex: "examTest/qaSignCard",
            title: "补习班打卡签到",
          },
          {
            MenuIndex: "reTake",
            title: "质量补习班课程",
          },
        ],
      },
      {
        MenuIndex: "reTakeTest",
        title: "质量补习班考试",
        accessRights: "93,95",
      },
      {
        MenuIndex: "examCenter",
        title: "考试中心",
        accessRights: "1,92,96",
        children: [
          {
            MenuIndex: "testCenter/noBeginTest",
            title: "未考试",
          },
          {
            MenuIndex: "testCenter/onGoingTest",
            title: "进行中",
          },
          {
            MenuIndex: "testCenter/isOverTest",
            title: "已考试",
          },
        ],
      },
    ],
  },
  getters: {
    menu: (state) => state.menu,
  },
};

export default menus;
