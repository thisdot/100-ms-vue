<template>
  <div>
    <footer class="control-bar">
      <div class="control-bar-left"></div>
      <div class="control-bar-center">
        <button
          class="btn-control"
          @click="toggleAudio"
          :class="{ pressed: hmsStore.hmsIsLocalAudioEnabled }"
        >
          <span v-if="hmsStore.hmsIsLocalAudioEnabled">MicIcon</span>
          <span v-else>MicOffIcon</span>
        </button>
        <button
          class="btn-control"
          @click="toggleVideo"
          :class="{ pressed: hmsStore.hmsIsLocalVideoEnabled }"
        >
          <span v-if="hmsStore.hmsIsLocalVideoEnabled">VideoIcon</span>
          <span v-else>VideoOffIcon</span>
        </button>
        <button
          class="btn-control"
          @click="toggleScreen"
          :class="{ pressed: hmsStore.hmsIsLocalScreenShared }"
        >
          share screen
        </button>
        <button
          class="btn-control"
          @click="showDeviceModal"
          :class="{ pressed: !!deviceModal }"
        >
          settings
        </button>
        <div class="modal" v-if="deviceModal">
          <button class="close-modal" @click="closeDeviceModal">close</button>
          <DeviceSettings />
        </div>
      </div>
      <div class="control-bar-right">
        <button
          class="btn-control"
          @click="toggleChat"
          :class="{ pressed: hmsStore.isChatOpen }"
        >
          Chat
        </button>
      </div>
    </footer>
    <UChat v-if="hmsStore.isChatOpen" />
  </div>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import DeviceSettings from "./DeviceSettings.vue";
import { ref } from "vue";
import { useHmsStore } from "@/stores/hms";
import UChat from "./UChat.vue";
const hmsStore = useHmsStore();
//
let deviceModal = ref(false);

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
  width: auto;
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
  position: relative;
}
.close-modal {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
