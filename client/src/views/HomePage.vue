<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import socket from '@/utils/socketHelper';

const route = useRoute()
const router = useRouter()
const roomName = computed(() => {
  return route.query.room as string;
});

const welcomeMessage = computed(() => {
  return `Hello ${route.query.user}, Welcome to ${roomName.value}` as string
})

onMounted(() => {
  socket.on('message', (messageData: object) => {
    console.log(messageData)
  })
})

function handleRoomExit() {
  socket.emit('leaveRoom', { user: route.query.user, room: roomName.value }, (success: boolean) => {
    if (success) {
      router.push({ path: '/login' });
    }
  })
}

</script>

<template>
  <div class="home-view">
    <div class="sidebar">
      <h1 class="mb-4 text-slate-900 text-2xl">{{ roomName }}</h1>
      <ul class="user-list">
        <li class="user">User 1</li>
        <li class="user">User 2</li>
        <li class="user">User 3</li>
      </ul>
    </div>
    <div class="main-content">
      <div class="header flex justify-between">
        <h2>{{ welcomeMessage }}</h2>
        <button class="leave-button " @click="handleRoomExit">Leave room</button>
      </div>
      <div class="chat-window">
        <!-- Display chat messages here -->
      </div>
      <div class="input-area">
        <input type="text" placeholder="Type your message here" />
        <button class="send-button">Send</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.home-view {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  flex: 1;
  background-color: #f2f2f2;
  padding: 1rem;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user {
  margin-bottom: 0.5rem;
}

.main-content {
  flex: 4;
  padding: 1rem;
  background: var(--vt-c-white-soft);
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 1rem;
}

.chat-window {
  height: 100%;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
}

.input-area {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.send-button, .leave-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.leave-button {
  background: none;
  color: var(--vt-c-black);
  border: 1px solid var(--vt-c-text-light-2);
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
