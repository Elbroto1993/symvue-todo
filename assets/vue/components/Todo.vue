<template>
  <div class="card w-100 mt-2">
    <div class="card-body">
      {{ name }}
      {{ id }}
      <button @click="deleteTodo()">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    async deleteTodo() {
      this.$store.dispatch("todo/delete", this.$data.id);
    }
  }
};
</script>
