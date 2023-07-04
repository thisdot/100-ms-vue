<template>
  <div v-if="opeModal" class="modal">
    <AutoPlayError :onClose="closeModal" />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { HMSNotificationTypes } from "@100mslive/hms-video-store";
import { useToast, POSITION, TYPE } from "vue-toastification";
import { hmsNotifications } from "@/utils/hms";
import { useHmsStore } from "@/stores/hms";

import UToast from "./UToast.vue";
import AutoPlayError from "./AutoPlayError.vue";

const hmsStore = useHmsStore();
const toast = useToast();

let openModal = ref(false);

const closeModal = () => {
  openModal.value = false;
};

const unsub = hmsNotifications.onNotification((notification) => {
  const error = notification.data;
  const code = error?.code;
  switch (notification.type) {
    case HMSNotificationTypes.PEER_JOINED:
      toast.info(`${notification.data.name} joined the room`, {
        position: POSITION.BOTTOM_LEFT,
      });
      break;
    case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
      toast.info(notification.message, {
        position: POSITION.BOTTOM_LEFT,
      });
      break;
    case HMSNotificationTypes.ERROR:
      console.log("error received ", error);
      if (error.isTerminal) {
        toast.error(
          `Error, you're disconnected: ${error.message}: ${error.description}`,
          {
            position: POSITION.BOTTOM_LEFT,
            timeout: false,
          }
        );
      } else if ([3001, 3011].includes(code)) {
        // device permission error
        const isSystemError = code === 3011; // there are two types - system denied permission or user denied permission
        const isScreenShare = error.message.includes("screen");
        const action = isSystemError
          ? "Please enable permissions from system settings"
          : "Please enable permissions from the address bar or browser settings";
        if (isSystemError || !isScreenShare) {
          // screenshare user denied permission is pretty obvious(user clicks cancel), don't show it
          toast.error(`${error.message} => ${action}`, {
            position: POSITION.BOTTOM_LEFT,
            closeOnClick: false,
            timeout: false,
          });
        }
      } else if (code === 3008) {
        // autoplay error
        openModal.value = true;
      } else {
        toast.error(`Error: ${error.message}: ${error.description}`, {
          position: POSITION.BOTTOM_LEFT,
          timeout: false,
        });
      }
      break;
    case HMSNotificationTypes.RECONNECTING:
      toast.warning(
        "You are offline for now. While we try to reconnect, please check your internet connection.",
        {
          position: POSITION.BOTTOM_LEFT,
          timeout: false,
        }
      );
      break;
    case HMSNotificationTypes.RECONNECTED:
      toast.success("You are now connected");
      break;
    case HMSNotificationTypes.NEW_MESSAGE:
      if (!hmsStore.isChatOpen) {
        const data = notification.data;
        const toastStr = `<strong>Message from ${data.senderName}:</strong><br>${data.message}`;
        toast(
          {
            component: UToast,
            props: {
              message: toastStr,
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            type: TYPE.INFO,
          }
        );
      }
      break;
  }
});
onUnmounted(() => unsub());
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.66);
}
</style>
