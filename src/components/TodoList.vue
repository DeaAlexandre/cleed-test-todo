<template>
  <div>
    <div class="filters">
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">All</button>
      <button @click="setFilter('active')" :class="{ active: filter === 'active' }">Active</button>
      <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Todo } from '@/models/Todo';

export default defineComponent({
  name: 'TodoList',
  setup() {
    const store = useStore();
    const filter = ref('all');

    const filteredTodos = computed(() => {
      if (filter.value === 'all') {
        return store.getters.allTodos as Todo[];
      } else if (filter.value === 'active') {
        return store.getters.activeTodos as Todo[];
      } else if (filter.value === 'completed') {
        return store.getters.completedTodos as Todo[];
      }
    });

    const setFilter = (newFilter: string) => {
      filter.value = newFilter;
    };

    const toggleTodo = (id: number) => {
      store.dispatch('toggleTodo', id);
    };

    const removeTodo = (id: number) => {
      store.dispatch('removeTodo', id);
      setFilter(filter.value);
    };

    const editTodo = (id: number) => {
      const newText = prompt("Edit your todo:");
      if (newText) {
        store.dispatch('editTodo', { id, text: newText });
      }
    };

    return { filteredTodos, filter, setFilter, toggleTodo, removeTodo, editTodo };
  },
});
</script>

<style scoped>
.filters {
  margin-bottom: 20px;
}

.filters button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
}

.filters button.active {
  background-color: #2980b9;
}

.filters button:hover {
  background-color: #2980b9;
}

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