<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/add" class="nav-button">Add Todo</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    store.dispatch('fetchTodos');
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

.nav-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  text-decoration: none;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #2980b9;
}
</style>