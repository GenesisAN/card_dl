import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ChangePasswordView from "../views/ChangePasswordView.vue";
import CardUploadView from "../views/CardUploadView.vue";
import ForgetPasswordView from "../views/ForgetPasswordView.vue";
import CardView from "@/views/CardView.vue";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/forget",
    name: "forget",
    component: ForgetPasswordView,
  },
  {
    path: "/change-password/:token",
    name: "change-password",
    component: ChangePasswordView,
  },
  {
    path: "/card/:id",
    name: "card",
    component: CardView,
  },
  {
    path: "/card_upload",
    name: "card_upload",
    component: CardUploadView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
