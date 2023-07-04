<template>
  <div>
    <footer class="control-bar">
      <div class="control-bar-left"></div>
      <div class="control-bar-center">
        <button
          class="btn-control"
          @click="toggleAudio"
          :class="{ pressed: !hmsStore.hmsIsLocalAudioEnabled }"
        >
          <span v-if="hmsStore.hmsIsLocalAudioEnabled"><MicIcon /></span>
          <span v-else><MicOffIcon /></span>
        </button>
        <button
          class="btn-control"
          @click="toggleVideo"
          :class="{ pressed: !hmsStore.hmsIsLocalVideoEnabled }"
        >
          <span v-if="hmsStore.hmsIsLocalVideoEnabled"><VideoIcon /></span>
          <span v-else><VideoOffIcon /></span>
        </button>
        <button
          class="btn-control"
          @click="toggleScreen"
          :class="{ pressed: hmsStore.hmsIsLocalScreenShared }"
        >
          <ShareScreenIcon />
        </button>
        <button
          class="btn-control"
          @click="showDeviceModal"
          :class="{ pressed: !!deviceModal }"
        >
          <SettingsIcon />
        </button>
        <div
          class="modal"
          v-if="deviceModal"
          ref="modal"
          @click="closeDeviceModal"
        >
          <div class="wrap">
            <div class="content">
              <DeviceSettings />
            </div>
          </div>
        </div>
      </div>
      <div class="control-bar-right">
        <button
          class="btn-control"
          @click="toggleChat"
          :class="{ pressed: hmsStore.isChatOpen }"
        >
          <ChatIcon />
        </button>
      </div>
    </footer>
    <UChat v-if="hmsStore.isChatOpen" />
  </div>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import DeviceSettings from "./DeviceSettings.vue";
import { ref, onMounted } from "vue";
import { useHmsStore } from "@/stores/hms";
import UChat from "./UChat.vue";
import ChatIcon from "./icons/ChatIcon.vue";
import ShareScreenIcon from "./icons/ShareScreenIcon.vue";
import VideoIcon from "./icons/VideoIcon.vue";
import VideoOffIcon from "./icons/VideoOffIcon.vue";
import MicIcon from "./icons/MicIcon.vue";
import MicOffIcon from "./icons/MicOffIcon.vue";
import SettingsIcon from "./icons/SettingsIcon.vue";

const hmsStore = useHmsStore();
//
let deviceModal = ref(false);
let modal = ref();

async function toggleAudio() {
  await hmsActions.setLocalAudioEnabled(!hmsStore.hmsIsLocalAudioEnabled);
}

function toggleVideo() {
  hmsActions.setLocalVideoEnabled(!hmsStore.hmsIsLocalVideoEnabled);
}

function toggleScreen() {
  hmsActions.setScreenShareEnabled(!hmsStore.hmsIsLocalScreenShared);
}

const showDeviceModal = () => (deviceModal.value = true);

const closeDeviceModal = () => (deviceModal.value = false);
const toggleChat = () => (hmsStore.isChatOpen = !hmsStore.isChatOpen);

onMounted(() => {
  modal.value?.addEventListener("click", () => (deviceModal.value = false));
});
</script>

<style lang="scss" scoped>
.control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  &-right {
    margin-right: 1rem;
  }
  color: red;
}

.btn-control {
  width: 45px;
  height: 45px;

  background-color: #263238;

  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  color: white;

  border: 2px solid #37474f;
  border-radius: 15%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  margin: 3px;
  &:hover {
    background-color: #192425;
  }
  &.pressed {
    background-color: #345b6e;
    &:hover {
      background-color: #2b4a5b;
    }
  }
}

.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.66);
  .wrap {
    position: relative;
    margin: 2rem;
    max-height: 100%;

    .content {
      width: 40rem;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
