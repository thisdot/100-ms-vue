import {
  HMSReactiveStore,
  selectDevices,
  selectHMSMessages,
  selectIsConnectedToRoom,
  selectIsLocalAudioEnabled,
  selectIsLocalScreenShared,
  selectIsLocalVideoEnabled,
  selectIsSomeoneScreenSharing,
  selectLocalMediaSettings,
  selectPeers,
  selectPeerScreenSharing,
} from "@100mslive/hms-video-store";

const hms = new HMSReactiveStore();

// by default subscriber is notified about store changes post subscription only, this can be
// changed to call it right after subscribing too using this function.
hms.triggerOnSubscribe(); // optional, recommended

const hmsActions = hms.getActions();
const hmsStore = hms.getStore();
const hmsNotifications = hms.getNotifications();

const hmsSelectors = {
  hmsDevices: selectDevices,
  hmsMessages: selectHMSMessages,
  hmsIsConnectedToRoom: selectIsConnectedToRoom,
  hmsIsLocalAudioEnabled: selectIsLocalAudioEnabled,
  hmsIsLocalScreenShared: selectIsLocalScreenShared,
  hmsIsLocalVideoEnabled: selectIsLocalVideoEnabled,
  hmsIsSomeoneScreenSharing: selectIsSomeoneScreenSharing,
  hmsLocalMediaSettings: selectLocalMediaSettings,
  hmsPeers: selectPeers,
  hmsPeerScreenSharing: selectPeerScreenSharing,
};

export { hmsActions, hmsStore, hmsNotifications, hms, hmsSelectors };
