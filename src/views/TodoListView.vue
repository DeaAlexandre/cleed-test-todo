// src/views/TodoListView.vue
<template>
  <div>
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'TodoListView',
  components: {
    TodoList,
  },
});
</script>