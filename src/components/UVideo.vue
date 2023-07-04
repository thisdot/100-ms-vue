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
import { defineProps, computed, onMounted, onUnmounted, ref, watch } from "vue";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";
import Handsigns from "@/utils/handsigns";

import { useHmsStore } from "@/stores/hms";
const store = useHmsStore();

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

let unsub;
const videoElement = ref();
let sign = ref(null);
let detector;

const createDetectionInstance = async () => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "mediapipe",
    modelType: "lite",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/",
  };
  return await handPoseDetection.createDetector(model, detectorConfig);
};

function manageVideo(trackId, videoElement) {
  if (unsub) unsub(); // unsubscribe previous

  unsub = hmsStore.subscribe((track) => {
    if (!track && !videoElement) {
      return;
    }
    if (track?.enabled && detector) {
      hmsActions.attachVideo(track.id, videoElement);
      setInterval(async () => {
        const hands = await detector.estimateHands(videoElement);
        store.addHandSignBorder(
          hands.length ? props.peerId : "",
          props.peerContainer
        );
        if (hands.length > 0) {
          const GE = new fp.GestureEstimator([
            fp.Gestures.ThumbsUpGesture,
            Handsigns.aSign,
            Handsigns.bSign,
            Handsigns.cSign,
            Handsigns.dSign,
            Handsigns.eSign,
            Handsigns.fSign,
            Handsigns.gSign,
            Handsigns.hSign,
            Handsigns.iSign,
            Handsigns.jSign,
            Handsigns.kSign,
            Handsigns.lSign,
            Handsigns.mSign,
            Handsigns.nSign,
            Handsigns.oSign,
            Handsigns.pSign,
            Handsigns.qSign,
            Handsigns.rSign,
            Handsigns.sSign,
            Handsigns.tSign,
            Handsigns.uSign,
            Handsigns.vSign,
            Handsigns.wSign,
            Handsigns.xSign,
            Handsigns.ySign,
            Handsigns.zSign,
          ]);

          const landmark = hands[0].keypoints3D.map((value) => [
            value.x,
            value.y,
            value.z,
          ]);
          const estimatedGestures = await GE.estimate(landmark, 6.5);

          if (
            estimatedGestures.gestures &&
            estimatedGestures.gestures.length > 0
          ) {
            const confidence = estimatedGestures.gestures.map((p) => p.score);
            const maxConfidence = confidence.indexOf(
              Math.max.apply(undefined, confidence)
            );

            if (
              estimatedGestures.gestures[maxConfidence].name !== "thumbs_up"
            ) {
              sign.value = estimatedGestures.gestures[maxConfidence].name;
            } else {
              sign.value = null;
            }
          }
        } else {
          sign.value = null;
        }
      }, 2000);
    } else {
      hmsActions.detachVideo(track.id, videoElement);
    }
  }, selectVideoTrackByID(trackId));
}

const object_fit = computed(() => ({ "--objectFit": props.objectFit }));

watch([() => props.trackId, () => videoElement.value], () => {
  props.trackId &&
    videoElement.value &&
    manageVideo(props.trackId, videoElement.value);
});

onMounted(async () => {
  detector = await createDetectionInstance();
});

onUnmounted(() => {
  unsub?.();
  detector = null;
  videoElement.value = null;
});
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 100%;
  height: 100%;
  color: red;
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
