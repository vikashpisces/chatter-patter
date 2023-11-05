<template>
  <section class="login-view mt-0 mx-auto">
    <div class="flex flex-col items-center justify-center min-h-screen w-full">
      <h2 class="text-4xl font-bold mb-6 text-[var(--vt-c-white-soft)]">Welcome to Chatter Patter</h2>
      <div class="bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 class="text-xl font-semibold mb-4 text-center">Join a room</h2>
        <form class="space-y-4" @submit.prevent="handleJoiningRoom()">
          <div>
            <label class="block text-gray-700">Username</label>
            <input 
              type="text" 
              required
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your username"
              v-model="userName" />
          </div>
          <div>
            <label class="block text-gray-700">Room Selection</label>
            <select 
              required
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="selectedRoom">
              <option 
                v-for="room in availableRooms"
                :key="room.value" 
                :value="room.value">
                {{room.name}}
              </option>
            </select>
          </div>
          <button class="flex bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 items-center mx-auto" type="submit">Join</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import socket from '@/utils/socketHelper';
import { useRouter } from 'vue-router';

const availableRooms = [
  { name: 'Room 1', value: 'room1' },
  { name: 'Room 2', value: 'room2' },
  { name: 'Room 3', value: 'room3' },
];

const userName = ref('')
const selectedRoom = ref()

const router = useRouter();
function handleJoiningRoom() {
  // ToDo: handle payload validation
  if(!userName.value || !selectedRoom.value) {
    console.log("User and room selection are mandatory to start the chat")
    return
  }

  socket.emit('joinRoom', { userName: userName.value, room: selectedRoom.value }, (success: boolean) => {
    if (success) {
      router.push({ path: '/home', query: { user: userName.value, room: availableRooms.find((room) => room.value === selectedRoom.value)?.value } });
    }
  })
}
</script>
<style>
.login-view {
  display: flex;

}
@media (min-width: 640px) {
  .w-80 {
    width: 20rem;
  }
}
</style>
