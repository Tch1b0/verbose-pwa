import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
    },
    {
        path: "/learn",
        name: "learn",
        component: () => import("@/views/LearnView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL), // createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
