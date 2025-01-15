<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CG BETA</router-link>
      <div class="d-flex">
        <router-link v-if="!isLoggedIn" class="btn btn-primary" to="/">Login</router-link>
        <router-link v-if="isLoggedIn" class="btn btn-success ms-2" to="/game">Game</router-link>
        <router-link v-if="isLoggedIn" class="btn btn-success ms-2" to="/leaderboard">Leaderboard</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('accessToken');
});

window.addEventListener('storage', () => {
  isLoggedIn.value = !!localStorage.getItem('accessToken');
});
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
