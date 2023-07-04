<template>
  <div class="video-wrapper">
    <video
      class="peer-video"
      :style="object_fit"
      :class="{ mirror: mirror }"
      ref="videoElement"
      autoPlay
      muted
      playsInline
    />
    <div v-if="sign" class="alphabet">{{ sign }}</div>
  </div>
</template>

<script setup>
import { hmsActions, hmsStore } from "@/utils/hms";
import { selectVideoTrackByID } from "@100mslive/hms-video-store";
import { defineProps, computed, onUnmounted, ref, watch } from "vue";
const props = defineProps({
  mirror: {
    type: Boolean,
    default: false,
  },
  trackId: {
    type: String,
    required: true,
  },
  peerId: {
    type: String,
  },
  peerContainer: {
    type: HTMLElement,
  },
  objectFit: {
    type: String,
    default: "cover",
  },
});

let unsub = ref();
const videoElement = ref();
let sign = ref(null);

function manageVideo(trackId, videoElement) {
  if (unsub.value) unsub.value(); // unsubscribe previous

  unsub.value = hmsStore.subscribe((track) => {
    if (!track || !videoElement) {
      return;
    }
    if (track?.enabled) {
      hmsActions.attachVideo(track.id, videoElement);
      setInterval(async () => {
        //
      }, 2000);
    } else {
      hmsActions.detachVideo(track.id, videoElement);
    }
  }, selectVideoTrackByID(trackId));
}

const object_fit = computed(() => ({ "--objectFit": props.objectFit }));

watch([() => props.trackId, () => videoElement.value], () => {
  props.trackId && manageVideo(props.trackId, videoElement.value);
});

onUnmounted(() => unsub.value?.());
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 100%;
  height: 100%;
}
.peer-video {
  height: 100%;
  width: 100%;
  border-radius: 0.25rem;
  object-fit: var(--objectFit);
  &.mirror {
    transform: scaleX(-1);
  }
}

.alphabet {
  position: absolute;
  bottom: 4rem;
  left: 45%;
  right: 45%;
  font-size: 6rem;
  font-weight: bold;
  color: rgb(241, 41, 41);
}
</style>
