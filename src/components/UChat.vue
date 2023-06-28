<template>
  <div class="chat-container">
    <div class="chat-header">
      <span>Chat</span>
      <button class="chat-close-btn" @click="closeChat">close</button>
    </div>
    <div
      ref="chatBodyElement"
      v-if="hmsStore.hmsMessages.length > 0"
      class="chat-messages"
    >
      <div
        v-for="(msg, index) in hmsStore.hmsMessages"
        class="chat-message"
        :class="{ msgRight: msg.senderName === 'You' }"
        :key="index + msg.senderName"
      >
        <p class="chat-message-message" v-html="marked(msg.message)" />
        <span class="chat-message-info"
          >{{ msg.senderName }}, {{ formatTime(msg.time) }}</span
        >
      </div>
    </div>
    <div v-else class="chat-no-messages">
      <p>There are no messages here</p>
    </div>
    <form
      class="flex-center chat-input-container"
      @submit.prevent="sendMessage"
    >
      <input
        v-model="draftMessage"
        placeholder="Send a message..."
        autocomplete="off"
        aria-autocomplete="none"
        class="chat-input"
      />
    </form>
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
import { hmsActions } from "@/utils/hms";
import { marked } from "marked";
import { useHmsStore } from "@/stores/hms";
const hmsStore = useHmsStore();

const chatBodyElement = ref();
let draftMessage = ref("");
let autoScroll = ref(false);

const scrollToBottom = (instant = false) => {
  if (chatBodyElement.value) {
    chatBodyElement.value.scrollTo({
      top: chatBodyElement.value.scrollHeight,
      behavior: instant ? "auto" : "smooth",
    });
  }
};

const sendMessage = async () => {
  if (draftMessage.value && draftMessage.value.trim().length > 0) {
    try {
      await hmsActions.sendBroadcastMessage(draftMessage.value);
      draftMessage.value = "";
    } catch (err) {
      // toast.error(`Failed to send message - ${err.message}`);
    }
  }
};

const formatTime = (time) => {
  return time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const closeChat = () => (hmsStore.isChatOpen = !hmsStore.isChatOpen);

onBeforeUpdate(() => {
  autoScroll.value = Boolean(
    chatBodyElement.value &&
      chatBodyElement.value.offsetHeight + chatBodyElement.value.scrollTop >
        chatBodyElement.value.scrollHeight - 20
  );
});

onUpdated(() => {
  if (autoScroll.value) scrollToBottom();
});

onMounted(() => scrollToBottom(true));
</script>

<style lang="scss" scoped>
.chat {
  &-container {
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    width: min(400px, 75%);
    height: 65%;
    padding: 1rem;
    z-index: 10;
    background-color: #1b2528;
    border-radius: 0.5rem;
  }

  &-header {
    height: 5%;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &-close-btn {
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: red;
    outline: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: auto;
    padding: 0.1rem;
    border-radius: 0.3rem;
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  &-no-messages {
    display: flex;
    height: 85%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  &-messages {
    display: flex;
    flex-direction: column;
    height: 85%;
    padding-bottom: 1rem;
    overflow-y: scroll;
    gap: 0.5rem;
    align-items: flex-start;
    padding-right: 0.5rem;
  }

  &-message {
    padding: 0.4rem;
    min-width: 60%;
    max-width: 90%;
    background-color: #3c5a67;
    border-radius: 0.5rem;
    &-message {
      font-size: 1rem;
      line-height: 1.25rem;
      list-style-position: inside;
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: end;
      font-size: 0.6rem;
      margin-top: 0.1rem;
    }
  }
  &-input {
    &-container {
      display: flex;
      align-items: center;
      min-height: 3rem;
      max-height: 6rem;
      background-color: #30404b;
      height: 10%;
      position: relative;
      border: 0.5rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
    width: 100%;
    background-color: transparent;
    line-height: 1rem;
    resize: none;
    font-size: 100%;
    color: white;
    font-family: inherit;
    border: 0;
    outline: none;
  }
}
.msgRight {
  margin-left: auto;
}
</style>
