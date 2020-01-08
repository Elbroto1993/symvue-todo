import Vue from "vue";
import Vuex from "vuex";
import TodoModule from "./modules/todo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo: TodoModule
  }
});
