<template>
  <header>
    <a href="https://100ms.live/" rel="noreferrer" target="_blank">
      <img
        class="logo"
        src="https://www.100ms.live/assets/logo.svg"
        alt="100ms Logo"
      />
    </a>

    <h3 class="title">Conferencing</h3>

    <div class="right">
      <button
        title="Leave"
        class="btn-danger leave-btn space-right"
        @click="leaveRoom"
        v-if="hmsStore.hmsIsConnectedToRoom"
      >
        Leave Room
      </button>
      <span v-if="hmsStore.hmsIsConnectedToRoom" class="space-right"
        ><ShareLink
      /></span>
      <a
        title="Go to GitHub"
        href="https://github.com/thisdot/100-ms-vue"
        rel="noreferrer"
        target="_blank"
      >
        <img src="github.png" alt="Github Repo" />
      </a>
    </div>
  </header>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import ShareLink from "./ShareLink.vue";
import { useHmsStore } from "@/stores/hms";

const hmsStore = useHmsStore();
async function leaveRoom() {
  await hmsActions.leave();
}
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.right {
  display: flex;
  align-items: center;
}

.space-right {
  margin-right: 10px;
}

.title {
  text-align: center;
  font-size: 2rem;
}
</style>
