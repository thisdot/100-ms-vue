<template>
  <div class="autoplay-modal">
    <h2>Couldn't Play Audio :(</h2>
    <p>
      The browser wants us to get a confirmation for playing the Audio. Please
      allow audio to proceed.
    </p>
    <div class="unblock-btn">
      <button @click="unblockAudio" class="btn-primary">Allow Audio</button>
    </div>
  </div>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import { defineProps } from "vue";

const props = defineProps({
  onClose: {
    type: Function,
    default: () => null,
  },
});

const unblockAudio = async () => {
  await hmsActions.unblockAudio();
  props.onClose();
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.unblock-btn {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
