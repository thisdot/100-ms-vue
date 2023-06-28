<template>
  <div class="gallery-container" ref="galleryContainer">
    <div class="gallery" :class="{ justify_content_start }">
      <div
        v-for="peer in hmsStore.hmsPeers"
        :key="peer.id"
        class="tile"
        :class="{ first: isTalking === peer.id }"
      >
        <UPeer :peer="peer" />
        <div class="resizer" title="resize" @mousedown="mouseDownHandler">
          <MinimizeIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { findBestFitLayout } from "@/utils/bestFit";
import { useHmsStore } from "@/stores/hms";
import UPeer from "./UPeer.vue";
const hmsStore = useHmsStore();

const galleryContainer = ref();
let target;
// The current position of mouse
let x = ref(0);
let y = ref(0);

// The dimension of the element
let w = ref(0);
let h = ref(0);

let isTalking = "";

const justify_content_start = computed(() =>
  hmsStore.hmsPeers.length > 1 ? "justify_start" : ""
);

const arrangeTiles = (parent, peers) => {
  if (!galleryContainer.value) {
    return;
  }
  const containerWidth = parent?.getBoundingClientRect().width || 0;
  const containerHeight = parent?.getBoundingClientRect().height || 0;
  const numTiles = peers.length;
  let result = findBestFitLayout({ containerHeight, containerWidth, numTiles });
  galleryContainer.value?.style.setProperty("--width", `${result.width}px`);
  galleryContainer.value?.style.setProperty("--height", `${result.height}px`);
  galleryContainer.value?.style.setProperty("--cols", `${result.cols}`);
};

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x.value;
  const dy = e.clientY - y.value;

  // Adjust the dimension of element
  target.style.width = `${w.value + dx}px`;
  target.style.height = `${h.value + dy}px`;
};

const mouseUpHandler = function () {
  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

const mouseDownHandler = function (e) {
  e.stopPropagation();
  // Get the current mouse position
  target = e.currentTarget.parentNode;
  x.value = e.clientX;
  y.value = e.clientY;

  // Calculate the dimension of element
  const styles = window.getComputedStyle(target);
  w.value = parseInt(styles.width, 10);
  h.value = parseInt(styles.height, 10);

  // // Attach the listeners to `document`
  if (target) {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
};

onMounted(() => {
  const resizeObserver = new ResizeObserver(() =>
    arrangeTiles(galleryContainer.value, hmsStore.hmsPeers)
  );
  galleryContainer.value && resizeObserver.observe(galleryContainer.value);
  return () =>
    galleryContainer.value && resizeObserver.unobserve(galleryContainer.value);
});

watchEffect(() => {
  arrangeTiles(galleryContainer.value, hmsStore.hmsPeers);
});
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: calc(var(--width) * var(--cols));
  &.justify_start {
    justify-content: flex-start;
  }
  &-container {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}

.tile {
  width: var(--width);
  min-width: 250px;
  height: var(--height);
  min-height: 250px;
  padding: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  order: 99999;
  &.first {
    order: 0;
  }

  & > .resizer {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 1000;
    width: 2rem;
    height: 2rem;
    border-radius: 6rem;
    background-color: #0f0f0fbc;
    cursor: nwse-resize;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
