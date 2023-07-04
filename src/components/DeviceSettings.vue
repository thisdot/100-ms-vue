<template>
  <div class="device-settings" @click.stop="null">
    <h1>Device Settings</h1>
    <div
      v-for="device_setting in device_settings"
      :key="device_setting.heading"
      class="selection"
    >
      <h2>{{ device_setting.heading }}</h2>
      <select
        :value="device_setting.selectedDevices"
        @change="device_setting.onChange"
      >
        <option
          v-for="device in device_setting.items"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import { computed } from "vue";
import { useHmsStore } from "@/stores/hms";
const hmsStore = useHmsStore();

const changeVideo = (e) => {
  hmsActions.setVideoSettings({ deviceId: e.target.value });
};
const changeAudio = (e) => {
  hmsActions.setAudioSettings({ deviceId: e.target.value });
};
const changeSpeaker = (e) => {
  hmsActions.setAudioOutputDevice(e.target.value);
};

const device_settings = computed(() => {
  return [
    {
      onChange: changeVideo,
      heading: "Video",
      items: hmsStore.hmsDevices.videoInput,
      selectedDevices: hmsStore.hmsLocalMediaSettings.videoInputDeviceId,
    },
    {
      onChange: changeAudio,
      heading: "Audio",
      items: hmsStore.hmsDevices.audioInput,
      selectedDevices: hmsStore.hmsLocalMediaSettings.audioInputDeviceId,
    },
    {
      onChange: changeSpeaker,
      heading: "Speaker",
      items: hmsStore.hmsDevices.audioOutput,
      selectedDevices: hmsStore.hmsLocalMediaSettings.audioOutputDeviceId,
    },
  ];
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 15px;
}

.device-settings {
  position: relative;
  padding: 1rem;
  max-height: calc(100vh - 4rem);
  overflow: auto;
  background: rgb(44, 56, 63);
  color: white;
  border-radius: 0.5rem;
}

.selection {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

select {
  width: 80%;
  background: rgb(60, 76, 86);
  color: white;
  outline: none;
  border: none;
  font-size: inherit;
}
</style>
