import TodoAPI from "../../api/todo";

const CREATING_TODO = "CREATING_TODO",
  CREATING_TODO_SUCCESS = "CREATING_TODO_SUCCESS",
  CREATING_TODO_ERROR = "CREATING_TODO_ERROR",
  FETCHING_TODOS = "FETCHING_TODOS",
  FETCHING_TODOS_SUCCESS = "FETCHING_TODOS_SUCCESS",
  FETCHING_TODOS_ERROR = "FETCHING_TODOS_ERROR",
  DELETING_TODO = "DELETING_TODO",
  DELETING_TODO_SUCCESS = "DELETING_TODO_SUCCESS",
  DELETING_TODO_ERROR = "DELETING_TODO_ERROR";

export default {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
    todos: []
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    },
    hasTodos(state) {
      return state.todos.length > 0;
    },
    todos(state) {
      return state.todos;
    }
  },
  mutations: {
    [CREATING_TODO](state) {
      state.isLoading = true;
      state.error = null;
    },
    [CREATING_TODO_SUCCESS](state, todo) {
      state.isLoading = false;
      state.error = null;
      state.todos.unshift(todo);
    },
    [CREATING_TODO_ERROR](state, error) {
      state.isLoading = false;
      state.error = error;
      state.todos = [];
    },
    [FETCHING_TODOS](state) {
      state.isLoading = true;
      state.error = null;
      state.todos = [];
    },
    [FETCHING_TODOS_SUCCESS](state, todos) {
      state.isLoading = false;
      state.error = null;
      state.todos = todos;
    },
    [FETCHING_TODOS_ERROR](state, error) {
      state.isLoading = false;
      state.error = error;
      state.todos = [];
    },
    [DELETING_TODO](state) {
      state.isLoading = true;
      state.error = null;
    },
    [DELETING_TODO_SUCCESS](state, id) {
      state.isLoading = false;
      state.error = null;
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    [DELETING_TODO_ERROR](state, error) {
      state.isLoading = false;
      state.error = error;
      state.todos = [];
    }
  },
  actions: {
    async create({ commit }, name) {
      commit(CREATING_TODO);
      try {
        let response = await TodoAPI.create(name);
        commit(CREATING_TODO_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_TODO_ERROR, error);
        return null;
      }
    },
    async delete({ commit }, id) {
      commit(DELETING_TODO);
      try {
        await TodoAPI.delete(id);
        commit(DELETING_TODO_SUCCESS, id);
      } catch (error) {
        commit(DELETING_TODO_ERROR, error);
        return null;
      }
    },
    async findAll({ commit }) {
      commit(FETCHING_TODOS);
      try {
        let response = await TodoAPI.findAll();
        commit(FETCHING_TODOS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_TODOS_ERROR, error);
        return null;
      }
    }
  }
};
