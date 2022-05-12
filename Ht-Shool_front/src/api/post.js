import service from "../utils/request";

// 提交考试数据
export function submitTest (obj) {
    return service.post('/PostTest/submitTest', JSON.stringify(obj), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 将点击考试的内容标记为正在进行中
export function addToOnGoing(obj) {
    return service.post("/PostTest/addToOnGoing", JSON.stringify(obj), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 进行中考试结束考试
export function OnGoingFinishTest(obj) {
    return service.post("/PostTest/OnGoingFinishTest", JSON.stringify(obj), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 暂存题目到数据库后端
export function insertQuestTemp(obj) {
    return service.post("/PostTest/insertQuestTemp", JSON.stringify(obj), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 暂存全部题目到后端
export  function insertAllQuestTemp(obj) {
    return service.post("/PostTest/insertAllQuestTemp", JSON.stringify(obj), {
        headers: { 'Content-Type': 'application/json' }
    })
}


