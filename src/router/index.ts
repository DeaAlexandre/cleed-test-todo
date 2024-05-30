import { createRouter, createWebHistory } from 'vue-router';
import TodoListView from '@/views/TodoListView.vue';
import TodoFormView from '@/views/TodoFormView.vue';

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoListView,
  },
  {
    path: '/add',
    name: 'TodoForm',
    component: TodoFormView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;