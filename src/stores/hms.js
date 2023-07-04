import { hmsStore, hmsSelectors } from "@/utils/hms";
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
  },
});
