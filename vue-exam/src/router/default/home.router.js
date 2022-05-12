const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("@/views/Home.vue"),
      left: () => import("@/components/cusHomeLeft"),
      top: () => import("@/components/cusHomeTop"),
    },
    children: [
      {
        path: "/examPaper/add",
        name: "examPaperAdd",
        component: () => import("@/views/examPaper/add"),
      },
      {
        path: "/examPaper/list",
        name: "examPaperList",
        component: () => import("@/views/examPaper/list"),
      },
      {
        path: "/examPaper/detail",
        name: "examPaperDetail",
        component: () => import("@/views/examPaper/detail"),
      },
      {
        path: "/examTest/add",
        name: "examTestAdd",
        component: () => import("@/views/examTest/add"),
      },
      {
        path: "/examTest/list",
        name: "examTestList",
        component: () => import("@/views/examTest/list"),
      },
      {
        path: "/examTest/detail",
        name: "examTestDetail",
        component: () => import("@/views/examTest/detail"),
      },
      // 补习班打卡签到
      {
        path: "/examTest/qaSignCard",
        name: "qaSignCard",
        component: () => import("@/views/examTest/qaSignCard"),
      },
      {
        path: "/examTest/qaSignCardForDetail",
        name: "qaSignCardForDetail",
        component: () => import("@/views/examTest/qaSignCardForDetail"),
      },
      {
        path: "/examTest/qaSignCardForUpdate",
        name: "qaSignCardForUpdate",
        component: () => import("@/views/examTest/qaSignCardForUpdate"),
      },
      // 考试打卡签到
      {
        path: "/examTest/testSignCard",
        name: "testSignCard",
        component: () => import("@/views/examTest/testSignCard"),
      },
      {
        path: "/examTest/testSignCardForDetail",
        name: "testSignCardForDetail",
        component: () => import("@/views/examTest/testSignCardForDetail"),
      },
      {
        path: "/examTest/testSignCardForUpdate",
        name: "testSignCardForUpdate",
        component: () => import("@/views/examTest/testSignCardForUpdate"),
      },
      {
        path: "/examCourse/add",
        name: "examCourseAdd",
        component: () => import("@/views/examCourse/add"),
      },
      {
        path: "/examCourse/list",
        name: "examCourseList",
        component: () => import("@/views/examCourse/list"),
      },
      {
        path: "/examCourse/detail",
        name: "examCourseDetail",
        component: () => import("@/views/examCourse/detail"),
      },
      {
        path: "/studyCenter/examCourseList",
        name: "studyCenterExamCourseList",
        component: () => import("@/views/studyCenter/examCourseList"),
      },
      {
        path: "/studyCenter/examMaterialList",
        name: "studyCenterExamMaterialList",
        component: () => import("@/views/studyCenter/examMaterialList"),
      },
      {
        path: "/studyCenter/slidePlay",
        name: "studyCenterSlidePlay",
        component: () => import("@/views/studyCenter/slidePlay"),
      },
      {
        path: "/studyCenter/mediaPlay",
        name: "studyCenterMediaPlay",
        component: () => import("@/views/studyCenter/mediaPlay"),
      },
      // 课程打卡签到
      {
        path: "/examCourse/courseSignCard",
        name: "courseSignCard",
        component: () => import("@/views/examCourse/courseSignCard"),
      },
      {
        path: "/examCourse/courseSignCardForDetail",
        name: "courseSignCardForDetail",
        component: () => import("@/views/examCourse/courseSignCardForDetail"),
      },
      {
        path: "/examCourse/courseSignCardForUpdate",
        name: "courseSignCardForUpdate",
        component: () => import("@/views/examCourse/courseSignCardForUpdate"),
      },
      {
        path: "/reTake",
        name: "reTake",
        component: () => import("@/views/reTake/pages/list"),
      },
      {
        path: "/reTake/add",
        name: "reTake/add",
        component: () => import("@/views/reTake/pages/add"),
      },
      {
        path: "/reTake/detail",
        name: "reTake/detail",
        component: () => import("@/views/reTake/pages/detail"),
      },
      {
        path: "/reTakeTest/detail",
        name: "reTakeTest/detail",
        component: () => import("@/views/reTakeTest/pages/detail"),
      },
      {
        path: "/reTakeTest",
        name: "reTakeTest",
        component: () => import("@/views/reTakeTest/pages/list"),
      },
      {
        path: "/reTakeTest/disposal",
        name: "reTakeTest/disposal",
        component: () => import("@/views/reTakeTest/pages/disposal"),
      },
      // 学员考试
      {
        path: "/testCenter/noBeginTest",
        name: "noBeginTest",
        component: () => import("@/views/testCenter/noBeginTest"),
      },
      {
        path: "/testCenter/onGoingTest",
        name: "onGoingTest",
        component: () => import("@/views/testCenter/onGoingTest"),
      },
      {
        path: "/testCenter/isOverTest",
        name: "isOverTest",
        component: () => import("@/views/testCenter/isOverTest"),
      },
      {
        path: "/testCenter/testView",
        name: "testView",
        component: () => import("@/views/testCenter/testView"),
      },
      {
        path: "/testCenter/testResult",
        name: "testResult",
        component: () => import("@/views/testCenter/testResult"),
      },
    ],
  },
];
export default routes;
