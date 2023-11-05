<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  router.push('/login')
})
</script>

<template>
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
