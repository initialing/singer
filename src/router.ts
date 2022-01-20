import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import Login from "./pages/login.vue";
import MainPage from "./pages/mainPage.vue";

const route: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: MainPage,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes: route,
});
