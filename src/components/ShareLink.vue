<template>
  <span title="copy link" class="share-btn" @click="copyShareLink">
    <ShareIcon />
  </span>
</template>

<script setup>
import { useHmsStore } from "@/stores/hms";
import ShareIcon from "./icons/ShareIcon.vue";
import { useToast } from "vue-toastification";

const hmsStore = useHmsStore();
const toast = useToast();

function copyShareLink() {
  const url = `${window.location.origin}?token=${hmsStore.token}`;
  console.log("sharable url = ", url);
  navigator.clipboard.writeText(url).then(
    function () {
      toast.success("Room link copied to clipboard");
    },
    function (err) {
      console.error("failed ot copy link to clip board", err);
    }
  );
}
</script>

<style lang="scss">
.share-btn {
  cursor: pointer;
}
</style>
