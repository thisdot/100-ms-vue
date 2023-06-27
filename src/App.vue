<template>
  <div class="wrapper">
    <video
      ref="videoCam"
      class="peer-video"
      :style="{ '--objectFit': 'contain' }"
      preload="auto"
      autoPlay
      muted
      playsInline
    ></video>
    <div class="alphabet">{{ sign }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";
import Handsigns from "@/utils/handsigns";

const videoCam = ref();
const DETECTION_INTERVAL_MILLISECONDS = 250;
let sign = ref(null);

// We ask permission to use audio and video and initialise the webcam by assigning it to our ref
function initialiseWebCamera() {
  let All_mediaDevices = navigator.mediaDevices;
  if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }
  All_mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
    .then(function (vidStream) {
      if ("srcObject" in videoCam.value) {
        videoCam.value.srcObject = vidStream;
      } else {
        videoCam.value.src = window.URL.createObjectURL(vidStream);
      }
      videoCam.value.onloadedmetadata = function () {
        videoCam.value.play();
      };
    })
    .catch(function (e) {
      console.log(e.name + ": " + e.message);
    });
}

// We generate our detection strategy using the media pipes model.
const createDetectionInstance = async () => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "mediapipe",
    modelType: "lite",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/",
  };
  return await handPoseDetection.createDetector(model, detectorConfig);
};

// we estimate the hand detection using the fingerpose package.
// This uses the value of the handdetection with a preset group of gestures
// to determine which sign has been shown on screen.
// eslint-disable-next-line
const handleSignDetection = (detector) => {
  if (!videoCam.value || !detector) return;
  setInterval(async () => {
    const hands = await detector.estimateHands(videoCam.value);
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

      if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
        const confidence = estimatedGestures.gestures.map((p) => p.score);
        const maxConfidence = confidence.indexOf(
          Math.max.apply(undefined, confidence)
        );

        if (estimatedGestures.gestures[maxConfidence].name !== "thumbs_up") {
          sign.value = estimatedGestures.gestures[maxConfidence].name;
        } else {
          sign.value = null;
        }
      }
    }
  }, DETECTION_INTERVAL_MILLISECONDS);
};
onMounted(async () => {
  initialiseWebCamera();
  // eslint-disable-next-line
  const detector = await createDetectionInstance();
  handleSignDetection(detector);
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.peer-video {
  height: 50%;
  width: 50%;
  border-radius: 0.25rem;
  object-fit: var(--objectFit);
  transform: scaleX(-1);
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
