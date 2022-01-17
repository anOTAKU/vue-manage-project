import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home"),
      },
      {
        path: "/mall",
        name: "mall",
        component: () => import("@/views/Mall"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/User"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
