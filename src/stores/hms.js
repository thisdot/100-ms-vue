import { hmsStore, hmsSelectors } from "@/utils/hms";
import {
  selectVideoTrackByPeerID,
  selectPeerAudioByID,
} from "@100mslive/hms-video-store";
import { defineStore } from "pinia";

export const useHmsStore = defineStore("hms", {
  state: () => ({
    token: "",
    isChatOpen: false,
    isTalking: "",
    hmsPeers: "",
    hmsIsConnectedToRoom: "",
    hmsIsLocalAudioEnabled: "",
    hmsIsLocalVideoEnabled: "",
    hmsMessages: "",
    hmsDevices: "",
    hmsLocalMediaSettings: "",
    hmsIsLocalScreenShared: "",
    hmsIsSomeoneScreenSharing: "",
    hmsPeerScreenSharing: "",
  }),
  actions: {
    // This will trigger a callback anytime the store changes
    initialiseSubscribe() {
      for (const selectorName in hmsSelectors) {
        //we set the initial values
        console.log(
          "storeName %s Selector $s",
          selectorName,
          hmsSelectors[selectorName]
        );
        hmsStore.subscribe((value) => {
          this.updateHmsSelector(value, selectorName);
        }, hmsSelectors[selectorName]);
      }
    },
    updateHmsSelector(value, selector) {
      const parsedValue = value ? JSON.parse(JSON.stringify(value)) : undefined;
      this[selector] = parsedValue;
    },
    addHandSignBorder(peerId, element) {
      hmsStore.subscribe((level) => {
        if (element) {
          const tile = element.parentNode;

          const color = "#f44336";
          if (tile) {
            tile.style.transition = "box-shadow 0.3s ease-in-out";
            tile.style.boxShadow = level
              ? `0px 0px ${24}px ${color}, 0px 0px ${16}px ${color}`
              : "";
          }
          if (level && peerId) {
            this.updateIsTalking(peerId);
          }
        }
      }, selectVideoTrackByPeerID(peerId));
    },
    addAudioBorder(peerId, element) {
      hmsStore.subscribe((level) => {
        if (element) {
          const sigmoid = (num) => 1 / (1 + Math.exp(-num));
          const tile = element.parentNode;
          const color = "#afd3ea";
          if (tile) {
            tile.style.transition = "box-shadow 0.3s ease-in-out";
            tile.style.boxShadow = level
              ? `0px 0px ${24 * sigmoid(level)}px ${color}, 0px 0px ${
                  16 * sigmoid(level)
                }px ${color}`
              : "";
          }
          element.style.transition =
            "box-shadow 0.3s ease-in-out, transform 0.5s ease-in-out";
          if (level && peerId) {
            this.updateIsTalking(peerId);
          }
        }
      }, selectPeerAudioByID(peerId));
    },
    updateIsTalking(value) {
      this.isTalking = JSON.parse(JSON.stringify(value));
    },
  },
});
