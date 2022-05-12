import Vue from 'vue'
import VueRouter from "vue-router";
import Entry from "../components/Entry";
import TestSystem_NoBegin from "../views/TestSystem_NoBegin";
import TestSystem_onGoing from "../views/TestSystem_onGoing";
import TestSystem_isOver from "../views/TestSystem_isOver";
import TestView from "../views/TestView";
import TestResult from "../views/TestResult";

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/entry'
        },
        {
            path: '/entry',
            name: 'Entry',
            component: Entry
        },
        {
            path: '/testSystem_NoBegin',
            name: 'TestSystem_NoBegin',
            component: TestSystem_NoBegin
        },
        {
            path: '/testSystem_OnGoing',
            name: 'TestSystem_OnGoing',
            component: TestSystem_onGoing
        },
        {
            path: '/testSystem_isOver',
            name: 'TestSystem_isOver',
            component: TestSystem_isOver
        },
        {
            path: '/testView',
            name: 'TestView',
            component: TestView
        },
        {
            path: '/testResult',
            name: 'TestResult',
            component: TestResult
        }
    ]
})
