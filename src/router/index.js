import Vue from "vue";
import VueRouter from "vue-router";
import MainVN from "../components/MainVN.vue";
import MainW from "../components/MainW.vue";
import MainVac from "../components/MainVac.vue";
import Admin from "../components/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainVN,
  },
  {
    path: "/world",
    component: MainW,
  },
  {
    path: "/vaccine",
    component: MainVac,
  },
  {
    path: "/admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
