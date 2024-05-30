import { createStore } from 'vuex';
import axios from 'axios';
import { Todo } from '@/models/Todo';

interface State {
  todos: Todo[];
}

export default createStore<State>({
  state: {
    todos: [] as Todo[],
  },
  getters: {
    allTodos: (state: State) => state.todos,
    completedTodos: (state: State) => state.todos.filter(todo => todo.completed),
    activeTodos: (state: State) => state.todos.filter(todo => !todo.completed),
  },
  mutations: {
    setTodos: (state: State, todos: Todo[]) => {
      state.todos = todos;
    },
    addTodo: (state: State, todo: Todo) => {
      state.todos.push(todo);
    },
    toggleTodo: (state: State, todoId: number) => {
      const todo = state.todos.find(t => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state: State, todoId: number) => {
      state.todos = state.todos.filter(t => t.id !== todoId);
    },
    editTodo: (state: State, payload: { id: number, text: string }) => {
      const todo = state.todos.find(t => t.id === payload.id);
      if (todo) {
        todo.text = payload.text;
      }
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get('http://localhost:3052/api/todos');
      commit('setTodos', response.data.data);
    },
    async addTodo({ commit }, text: string) {
      const response = await axios.post('http://localhost:3052/api/todos', { text });
      commit('addTodo', response.data.data);
    },
    async toggleTodo({ commit, state }, todoId: number) {
      const todo = state.todos.find(t => t.id === todoId);
      if (todo) {
        const response = await axios.put(`http://localhost:3052/api/todos/${todoId}`, {
          ...todo,
          completed: !todo.completed,
        });
        commit('toggleTodo', todoId);
      }
    },
    async removeTodo({ commit }, todoId: number) {
      await axios.delete(`http://localhost:3052/api/todos/${todoId}`);
      commit('removeTodo', todoId);
    },
    async editTodo({ commit }, payload: { id: number, text: string }) {
      await axios.put(`http://localhost:3052/api/todos/${payload.id}`, payload);
      commit('editTodo', payload);
    },
  },
});
