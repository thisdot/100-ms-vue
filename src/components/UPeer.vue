<template>
  <div class="peer-container" ref="peerTileElement">
    <!--show avatar if video is either muted or degraded-->
    <div
      v-if="!videoTrack?.enabled || videoTrack?.degraded"
      class="avatar-container"
    >
      <UserAvartar :name="peer.name" />
    </div>
    <UVideo
      :mirror="peer.isLocal"
      :trackId="videoTrack?.id"
      :peerId="peer.id"
      :peerContainer="peerTileElement"
    />
    <div class="peer-name">
      {{ peer.name }} {{ peer.isLocal ? "(You)" : "" }}
    </div>
    <div class="network-score">
      <ConnectionQuality :peerId="peer.id" />
    </div>
    <div class="mic-state">
      <span v-if="!isAudioEnabled"><MicOffIcon /></span>
      <span v-else><MicIcon /></span>
    </div>
  </div>
</template>

<script setup>
import { hmsStore } from "@/utils/hms";
import {
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
} from "@100mslive/hms-video-store";
import { defineProps, onMounted, onUnmounted, ref } from "vue";
import ConnectionQuality from "./ConnectionQuality.vue";
import UVideo from "./UVideo.vue";
import UserAvartar from "./UserAvartar.vue";
import MicOffIcon from "./icons/MicOffIcon.vue";
import MicIcon from "./icons/MicIcon.vue";
import { addAudioBorder } from "@/utils/audioLevel";
const props = defineProps({
  peer: {
    type: Object,
  },
});

let peerTileElement = ref();
let videoTrack = ref();
let isAudioEnabled = ref(false);

const unsub1 = hmsStore.subscribe((track) => {
  videoTrack.value = track;
}, selectCameraStreamByPeerID(props.peer.id));

const unsub2 = hmsStore.subscribe((enabled) => {
  isAudioEnabled.value = enabled;
}, selectIsPeerAudioEnabled(props.peer.id));

onMounted(() => addAudioBorder(props.peer.id, peerTileElement.value));
onUnmounted(() => {
  unsub1();
  unsub2();
});
</script>

<style lang="scss" scoped>
.peer-name {
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.peer-container {
  margin: 7px;
  background: rgb(52, 67, 75);
  border-radius: 0.25rem;
  position: relative;
  height: 100%;
  width: 100%;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
}

.network-score {
  position: absolute;
  bottom: 0.25rem;
  left: 0.25rem;
}

.mic-state {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  color: white;
  background: #cc525f;
  border-radius: 100rem;
  padding: 6px;

  & > span > svg {
    width: 14px;
    height: 14px;
  }
}
</style>
