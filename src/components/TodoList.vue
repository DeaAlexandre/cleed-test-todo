<template>
  <div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span :class="{ completed: todo.completed }" @click="toggleTodo(todo.id)">
          {{ todo.text }}
        </span>
        <button @click="editTodo(todo.id)" class="edit-button">Edit</button>
        <button @click="removeTodo(todo.id)" class="remove-button">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { Todo } from '@/models/Todo';

export default defineComponent({
  name: 'TodoList',
  setup() {
    const store = useStore();
    const todos = store.getters.allTodos as Todo[];

    const toggleTodo = (id: number) => {
      store.dispatch('toggleTodo', id);
    };

    const removeTodo = (id: number) => {
      store.dispatch('removeTodo', id);
    };

    const editTodo = (id: number) => {
      const newText = prompt("Edit your todo:");
      if (newText) {
        store.dispatch('editTodo', { id, text: newText });
      }
    };

    return { todos, toggleTodo, removeTodo, editTodo };
  },
});
</script>

<style scoped>
.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f4f4f4;
  border-radius: 4px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.edit-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button:hover {
  background-color: #2980b9;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}
</style>