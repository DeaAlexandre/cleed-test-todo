<template>
  <div class="todo-form">
    <form @submit.prevent="addTodo">
      <input v-model="text" placeholder="Add a new todo" class="todo-input" />
      <button type="submit" class="add-button">Add Todo</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TodoForm',
  setup() {
    const store = useStore();
    const text = ref('');

    const addTodo = () => {
      if (text.value.trim() !== '') {
        store.dispatch('addTodo', text.value);
        text.value = '';
      }
    };

    return { text, addTodo };
  },
});
</script>

<style scoped>
.todo-form {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.todo-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.add-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #27ae60;
}
</style>