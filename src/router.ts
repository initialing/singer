import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import Login from "./pages/login.vue";

const route: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Login,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes: route,
});
