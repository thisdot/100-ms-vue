<template>
  <div :style="{ background: avatarColor }" class="avatar">{{ initials }}</div>
</template>

<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const initials = computed(() =>
  (props.name || "")
    .match(/(^\S\S?|\b\S)?/g)
    ?.join("")
    ?.match(/(^\S|\S$)?/g)
    ?.join("")
    .toUpperCase()
);

const colors = [
  "#616161",
  "#3F51B5",
  "#4CAF50",
  "#FFA000",
  "#795548",
  "#E91E63",
  "#2F80FF",
  "#8BC34A",
  "#F57C00",
  "#673AB7",
  "#009688",
  "#FBC02D",
];
// derive a color from the first letter
const colorIndex = (initials.value?.codePointAt(0) || 0) % colors.length;
const avatarColor = colors[colorIndex];
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 8%;
  font-weight: 500;
  font-size: 1.8rem;
  border-radius: 100rem;
}
</style>
