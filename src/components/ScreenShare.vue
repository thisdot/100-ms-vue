<template>
  <div class="screenshare-container">
    <UVideo :mirror="false" :trackId="screenTrack?.id" objectFit="contain" />
  </div>
</template>

<script setup>
import UVideo from "./UVideo.vue";
import { hmsStore } from "@/utils/hms";
import { selectScreenShareByPeerID } from "@100mslive/hms-video-store";
import { onUnmounted, ref, onMounted } from "vue";
import { useHmsStore } from "@/stores/hms";
const hmsStoreInstance = useHmsStore();

let unsub = ref();
let screenTrack = ref();

const retrieveScreenTrack = (peer) => {
  if (unsub.value) unsub.value();
  if (!peer) return;
  unsub.value = hmsStore.subscribe((track) => {
    screenTrack.value = track;
  }, selectScreenShareByPeerID(peer.id));
};

onMounted(() => {
  retrieveScreenTrack(hmsStoreInstance.hmsPeerScreenSharing);
});

onUnmounted(() => unsub.value?.());
</script>

<style lang="scss" scoped>
.screenshare-container {
  padding: 5px;
  height: 100%;
  width: 100%;
}
</style>
