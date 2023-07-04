<template>
  <section class="conference-section">
    <GalleryView v-if="!hmsStore.hmsIsSomeoneScreenSharing" />
    <div v-else class="screenshare-view">
      <div class="screenshare">
        <ScreenShare />
      </div>
      <div class="gallery">
        <GalleryView />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useHmsStore } from "@/stores/hms";
import GalleryView from "./GalleryView.vue";
import ScreenShare from "./ScreenShare.vue";
const hmsStore = useHmsStore();
</script>

<style lang="scss" scoped>
.conference-section {
  height: 100%;
  width: 100%;

  padding: 10px;
  margin: 0 auto;
}

.screenshare {
  &-view {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-around;
    @media (max-width: 600px) {
      flex-direction: column;
    }

    & > .screenshare {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex: 1 auto;
      @media (max-width: 600px) {
        flex-basis: auto;
        height: unset;
      }
    }

    & > .gallery {
      flex: 1 20%;
      @media (max-width: 600px) {
        flex-basis: auto;
        height: 20%;
        flex-grow: 1;
      }
    }
  }
}
</style>
