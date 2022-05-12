import service from "../utils/request";

// 获取登录人员的userId
export function getUserIdInfo(code, userId) {
 return service.get('/wx/getUserInfo',{
     headers: { 'Content-Type': 'application/json' },
     params: {
         code: code,
         userId: userId
     }
 })
}

// 获取企业微信的配置信息
export function getWxJsSdkConfig () {
    const url = window.location.href.split('#')[0]
    return service.get('/wx/getWxJsSdkConfig', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            url: url
            // url: ''
        }
    })
}

// 获取未开始考试信息
export function TestForNoBegin(userId) {
    return service.get('GetTest/TestForNoBegin',{
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId
        }
    })
}

// 获取正在进行中的考试
export function TestForOnGoing(userId) {
    return service.get('GetTest/TestForOnGoing', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId
        }
    })
}

// 获取已经完成的考试信息
export function TestForIsOver(userId) {
    return service.get('GetTest/TestForIsOver', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId
        }
    })
}

// 根据试卷id获取题目信息
export function getPaperQuestions(paperId) {
    return service.get('GetTest/getPaperQuestions', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            paperId: paperId
        }
    })
}
// 根据考试id获取题目
export function getExamTestQuestList(TEST_ID,userId) {
    return service.get('examTest/getExamTestQuestList',{
        headers: { 'Content-Type': 'application/json' },
        params: {
            TEST_ID: TEST_ID,
            userId: userId
        }
    })
}

// 获取用户名
export function getUserName(userId) {
    return service.get('Hr/getUserName', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId
        }
    })
}

// 继续考试获取暂存数据
export function countinueGetTemp(userId,testId) {
    return service.get('GetTest/countinueGetTemp', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId,
            testId: testId
        }
    })
}

// 删除暂存题目
export function deleteQuestTemp(userId,testId,questId) {
    return service.get('GetTest/deleteQuestTemp', {
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId,
            testId: testId,
            questId:questId
        }
    })
}
// 存入切屏次数
export function updateChangeScreenTimes(userId,TEST_ID,changeScreenTimes) {
    return service.get("GetTest/updateChangeScreenTimes", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: TEST_ID,
            changeScreenTimes: changeScreenTimes
        }
    })
}
// 查找切屏次数
export function selectChangeScreenTimes(userId,TEST_ID) {
    return service.get("GetTest/selectChangeScreenTimes", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: TEST_ID
        }
    })
}

// 判断暂存内容表是否有该人员的该考试记录
export function getContextTemp(userId, TEST_ID) {
    return service.get("GetTest/getContextTemp", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: TEST_ID
        }
    })
}

// 获取考试结果
export function getHistoryContextResult(testId,userId) {
    return service.get("GetTest/getHistoryContextResult", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: testId
        }
    })
}

// 新增个人补考
export function addNextExamTestPersonal(testId,userId) {
    return service.get("examTest/addNextExamTestPersonal", {
        headers: { "Content-Type" : "application/json" },
        params: {
            testId: testId,
            userId: userId
        }
    })
}

// 判断是否有正在进行中的考试，如有则禁止点击另一个考试开始
export function havingOnging(userId) {
    return service.get("GetTest/havingOngoing", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId
        }
    })
}

// 更新剩余考试时间
export function updateTestTime(userId,testId,TEST_TIME) {
    return service.get("GetTest/updateTestTime", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: testId,
            TEST_TIME: TEST_TIME
        }
    })
}
// 获取剩余考试时间
export function getTestTime(userId,testId) {
    return service.get("GetTest/getTestTime", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: testId
        }
    })
}

// 获取考试卡控状态
export function getTestFlag(userId,testId) {
    return service.get("GetTest/getTestFlag", {
        headers: { "Content-Type" : "application/json" },
        params: {
            userId: userId,
            testId: testId
        }
    })
}
