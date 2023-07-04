<template>
  <div class="gallery-container">
    <div class="gallery">
      <div
        v-for="peer in hmsStore.hmsPeers"
        :key="peer.id"
        class="tile"
        :class="{ first: isTalking === peer.id }"
      >
        <UPeer :peer="peer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHmsStore } from "@/stores/hms";
import { computed } from "vue";
import UPeer from "./UPeer.vue";
const hmsStore = useHmsStore();

let isTalking = computed(() => hmsStore.isTalking);
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  justify-content: center;
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
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  order: 99999;
  &.first {
    order: 0;
  }
}
</style>
