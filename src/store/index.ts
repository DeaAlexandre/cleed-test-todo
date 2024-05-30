import { createStore } from 'vuex';
import { Todo } from '@/models/Todo';

interface State {
  todos: Todo[];
  nextTodoId: number;
}

export default createStore<State>({
  state: {
    todos: [] as Todo[],
    nextTodoId: 1,
  },
  getters: {
    allTodos: (state: State) => state.todos,
  },
  mutations: {
    addTodo: (state: State, todo: Todo) => {
      state.todos.push(todo);
      state.nextTodoId++;
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
    addTodo: ({ commit, state }, text: string) => {
      const newTodo: Todo = {
        id: state.nextTodoId,
        text,
        completed: false,
      };
      commit('addTodo', newTodo);
    },
    toggleTodo: ({ commit }, todoId: number) => {
      commit('toggleTodo', todoId);
    },
    removeTodo: ({ commit }, todoId: number) => {
      commit('removeTodo', todoId);
    },
    editTodo: ({ commit }, payload: { id: number, text: string }) => {
      commit('editTodo', payload);
    },
  },
});
