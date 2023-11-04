<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header class="w-full h-16 flex items-center justify-between bg-slate-950 sticky color-white">
    <RouterLink  to="/" class="mx-4">Home</RouterLink>
    <RouterLink  to="/login" class="mx-4">Login</RouterLink>
  </header> -->
  <main class="app-view w-full flex mt-0 mx-auto">
    <RouterView />
  </main>
</template>

<style scoped>
.app-view {
  background: var(--vt-c-black-mute);
}
@media (min-width: 1024px) {
  .app-view {

  }
}
</style>
