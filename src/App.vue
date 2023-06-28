<template>
  <div class="home">
    <h1>Tensorflow video demo</h1>
    <div class="layout">
      <div class="header">
        <UHeader />
      </div>
      <div v-if="hmsStore.hmsIsConnectedToRoom" class="conference-container">
        <UConference />
      </div>
      <div v-if="hmsStore.hmsIsConnectedToRoom" class="footer">
        <UFooter />
      </div>
      <JoinForm v-else />
    </div>
  </div>
</template>

<script setup>
import JoinForm from "@/components/JoinForm.vue";
import UConference from "@/components/UConference.vue";
import UFooter from "@/components/UFooter.vue";
import UHeader from "@/components/UHeader.vue";
import { onUnmounted } from "vue";
import { hmsActions } from "@/utils/hms";
import { useHmsStore } from "@/stores/hms";

//
function leaveRoom() {
  hmsActions.leave();
}

const hmsStore = useHmsStore();

hmsStore.initialiseSubscribe();

onUnmounted(() => leaveRoom());
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
}
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.conference-container {
  flex-grow: 1;
  overflow: auto;
  height: 100%;
}

.footer {
  flex-shrink: 0;
}
</style>
