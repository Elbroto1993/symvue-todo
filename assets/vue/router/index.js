import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Todos from "../views/Todos";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/home", component: Home },
    { path: "/todos", component: Todos },
    { path: "*", redirect: "/home" }
  ]
});
