<template>
  <div class="home">
    <div class="layout">
      <div class="header">
        <UHeader />
      </div>
      <div v-if="hmsStore.hmsIsConnectedToRoom" class="conference-container">
        <UConference />
      </div>
      <div v-if="hmsStore.hmsIsConnectedToRoom" class="footer">
        <UFooter />
      </div>
      <JoinForm v-else />
    </div>
  </div>
</template>

<script setup>
import JoinForm from "@/components/JoinForm.vue";
import UConference from "@/components/UConference.vue";
import UFooter from "@/components/UFooter.vue";
import UHeader from "@/components/UHeader.vue";
// import { onUnmounted } from "vue";
import { hmsActions } from "@/utils/hms";
import { useHmsStore } from "@/stores/hms";

function leaveRoom() {
  hmsActions.leave();
}

const hmsStore = useHmsStore();

hmsStore.initialiseSubscribe();

// onUnmounted(() => leaveRoom());
window.addEventListener("unload", () => leaveRoom());
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
}
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.conference-container {
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
}

.footer {
  flex-shrink: 0;
}

* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;

  background-color: #263238;
  height: 100vh;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
}

.btn-primary {
  padding: 6px 14px;

  background-color: #1565c0;

  border: 1px solid transparent;
  border-radius: 4px;

  font-family: inherit;
  font-size: 14px;
  color: white;
  &:hover {
    background-color: #104e93;
  }
}

.btn-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;

  background-color: #f44336;

  font-family: inherit;
  font-size: 14px;
  color: white;

  border: 1px solid transparent;
  border-radius: 4px;

  cursor: pointer;
  &:hover {
    background-color: #b9352b;
  }
}

:root {
  --toastContainerTop: auto;
  --toastContainerRight: auto;
  --toastContainerBottom: 3rem;
  --toastContainerLeft: 3rem;
  --toastWidth: 20rem;
}

.toast {
  &-default {
    --toastBackground: #61758f;
    --toastBarBackground: #4a5d6e;
  }
  &-green {
    --toastBackground: #36b37e;
    --toastBarBackground: #2f855a;
  }
  &-yellow {
    --toastBackground: #ffab00;
    --toastBarBackground: #b67b02;
  }
  &-red {
    --toastBackground: #cc525f;
    --toastBarBackground: #a6434e;
  }
}

/* some scroll bar related css to make scroll in chat look nicer */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #657080;
  border-radius: 5px;
}
</style>
