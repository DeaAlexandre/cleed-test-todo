<template>
  <div>
    <TodoForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoForm from '@/components/TodoForm.vue';

export default defineComponent({
  name: 'TodoFormView',
  components: {
    TodoForm,
  },
});
</script>