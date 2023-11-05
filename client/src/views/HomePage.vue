<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import socket from '@/utils/socketHelper';
import ChatMessage from '@/components/ChatMessage.vue';

const route = useRoute()
const router = useRouter()
const roomName = computed(() => {
  return route.query.room as string;
});

const welcomeMessage = computed(() => {
  return `Hello ${route.query.user}, Welcome to ${roomName.value}` as string
})

type MessageData = {
  userName: string,
  message: string,
  time: string
}

type User = {
  userName: string
}
type RoomUsers = {
  room: string,
  users: User[]
}
const messageList: Ref<MessageData[]> = ref([])
const userList: Ref<User[]> = ref([])
onMounted(() => {
  socket.on('message', (messageData: MessageData) => {
    messageList.value.push(messageData)
  })

  socket.on('userList', (roomUsers: RoomUsers) => {
    userList.value = roomUsers?.users || []
  })
})

onUnmounted(() => {
  handleRoomExit()
})

function handleRoomExit() {
  const exit = window.confirm('Are you sure to leave the room ?')
  if (exit) {
    socket.disconnect()
    router.replace({ path: '/login' });
    window.location.reload()
  }
}

const messageToSend = ref('')
function handleSendMessage() {
  if (!messageToSend.value) {
    console.log('Message cannot be empty')
    return;
  }
  socket.emit('chatMessage', messageToSend.value);
  messageToSend.value = ''
}

</script>

<template>
  <div class="home-view">
    <div class="sidebar">
      <h1 class="mb-4 text-slate-900 text-2xl">{{ roomName }}</h1>
      <ul class="user-list">
        <li v-for="user in userList" :key="user.userName" class="user">{{ user.userName }}</li>
      </ul>
    </div>
    <div class="main-content">
      <div class="header flex justify-between">
        <h2>{{ welcomeMessage }}</h2>
        <button class="leave-button " @click="handleRoomExit">Leave room</button>
      </div>
      <div class="chat-window">
        <Chat-Message :messages="messageList" />
      </div>
      <div class="input-area">
        <input type="text" placeholder="Type your message here" v-model="messageToSend"/>
        <button class="send-button" @click="handleSendMessage">Send</button>
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
