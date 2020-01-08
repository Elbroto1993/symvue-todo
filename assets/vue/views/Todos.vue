<template>
  <div>
    <div class="row col">
      <h1>Posts</h1>
    </div>

    <div class="row col">
      <form>
        <div class="form-row">
          <div class="col-8">
            <input v-model="name" type="text" class="form-control" />
          </div>
          <div class="col-4">
            <button
              :disabled="name.length === 0 || isLoading"
              type="button"
              class="btn btn-primary"
              @click="createTodo()"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="isLoading" class="row col">
      <p>Loading...</p>
    </div>

    <div v-else-if="hasError" class="row col">
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </div>

    <div v-else-if="!hasTodos" class="row col">
      No posts!
    </div>

    <div v-for="todo in todos" v-else :key="todo.id" class="row col">
      <todo :name="todo.name" v-bind:id="todo.id" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Todo from "../components/Todo";

export default {
  name: "Todos",
  components: {
    Todo
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    async createTodo() {
      const result = await this.$store.dispatch("todo/create", this.$data.name);
      if (result !== null) {
        this.$data.name = "";
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters["todo/isLoading"];
    },
    hasError() {
      return this.$store.getters["todo/hasError"];
    },
    error() {
      return this.$store.getters["todo/error"];
    },
    hasTodos() {
      console.log(this.$store.getters["todo/hasTodos"]);
      return this.$store.getters["todo/hasTodos"];
    },
    todos() {
      return this.$store.getters["todo/todos"];
    }
  },
  created() {
    this.$store.dispatch("todo/findAll");
  }
};
</script>
