import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import Login from "./pages/login.vue";
import MainPage from "./pages/mainPage.vue";
import EditMain from "./pages/edit/editMain.vue";
import CountryMain from "./pages/edit/country/countryMain.vue";
import EditCountry from "./pages/edit/country/editCountry.vue";
import ShowCountry from "./pages/edit/country/showCountry.vue";

const route: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: MainPage,
    },
    {
        path: "/edit",
        component: EditMain,
        children: [
            {
                path: "country",
                component: CountryMain,
                children: [
                    {
                        path: "edit",
                        component: EditCountry,
                    },
                    {
                        path: "show",
                        component: ShowCountry,
                    },
                ],
            },
        ],
    },
];

export default createRouter({
    history: createWebHistory(),
    routes: route,
});
