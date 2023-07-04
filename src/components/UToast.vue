<template>
  <div v-html="message" />
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>
