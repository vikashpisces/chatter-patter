<template>
  <div class="chat-messages">
    <div class="chat-messages__item"
      v-for="message in messages"
      :key="`${message.userName}-${message.time}`">
      <div class="user-meta">
        <span class="user-name" v-if="message.userName">{{ message.userName }}</span>
        <span class="chat-time">{{ message.time }}</span>
      </div>
      <div class="chat-content">{{ message.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  messages: { type: Array, required: true, default: () => [] }
})
</script>

<style scoped>
.chat-messages__item {
  display: flex;
  flex-direction: column;
}

.chat-messages__item + .chat-messages__item {
  margin-top: 1rem;
}

.chat-messages__item .user-meta {
  margin: 0 10px;
  font-size: small;
  color: var(--vt-c-text-light-2);
}

.chat-messages__item .user-meta span:first-of-type {
  margin-right: 10px;
}
.chat-messages__item .chat-content {
  background-color: var(--vt-c-text-dark-2);
  padding: 2rem;
  border-radius: 1rem;
}
</style>