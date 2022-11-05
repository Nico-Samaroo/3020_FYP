import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./axios";
import Home from "./pages/Home.vue";
import useAuthStore from "./stores/authStore";

export enum RouteName {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  DASHBOARD = "dashboard",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: RouteName.HOME,
  },
  {
    path: "/login",
    component: () => import("./pages/Login.vue"),
    name: RouteName.LOGIN,
    meta: { isLayoutDisabled: true },
  },
  {
    path: "/register",
    component: () => import("./pages/Register.vue"),
    name: RouteName.REGISTER,
    meta: { isLayoutDisabled: true },
  },
  {
    path: "/dashboard",
    component: () => import("./pages/Dashboard.vue"),
    name: RouteName.DASHBOARD,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory("/"),
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isInitialized) await authStore.initialize();
  if (!authStore.user && to.meta.requiresAuth)
    return next({ name: RouteName.LOGIN });
  next();
});

export default router;
