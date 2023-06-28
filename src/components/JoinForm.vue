<template>
  <form @submit.prevent="join">
    <h2>Join Room</h2>
    <input
      v-model="name"
      type="text"
      name="name"
      placeholder="What's your name?"
    />

    <input
      v-model="token"
      type="text"
      name="token"
      placeholder="App token for a room"
    />

    <button type="submit" class="btn-primary join-btn">
      {{ joinInProgress ? "Joining..." : "Join" }}
    </button>
  </form>
</template>

<script setup>
import { hmsActions } from "@/utils/hms";
import { ref } from "vue";
import { useHmsStore } from "@/stores/hms";

const hmsStore = useHmsStore();
let joinInProgress = ref(false);

const userKey = "name";
const tokenKey = "token";
const urlParams = new URLSearchParams(window.location.search);

// support for query params to directly populate the name and auth token values
let name = urlParams.get(userKey) || localStorage.getItem(userKey) || "";
let token = urlParams.get(tokenKey) || localStorage.getItem(tokenKey) || "";

const joinAsMuted = false;
const settings = joinAsMuted ? { isAudioMuted: true, isVideoMuted: true } : {};

async function join() {
  // set the values in localstorage to avoid taking in every time
  localStorage.setItem(userKey, name);
  localStorage.setItem(tokenKey, token);
  try {
    joinInProgress.value = true;
    hmsStore.token = token;
    // toast.removeAll(); // it's a new start
    await hmsActions.join({
      userName: name,
      authToken: token,
      rememberDeviceSelection: true,
      settings,
    });
  } catch (err) {
    console.error("Error in joining room", err);
    // toast.terminal(`Can't join => ${err.message}: ${err.description}`);
  } finally {
    joinInProgress.value = false;
  }
}
</script>

<style lang="scss" scoped>
form {
  width: min(100%, 500px);

  margin: 30px auto;
  padding: 20px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-radius: 8px;

  h2 {
    margin-bottom: 20px;
  }
}

input {
  display: block;

  width: 100%;
  height: 34px;

  padding: 5px;

  color: inherit;
  font-family: inherit;

  background: #37474f;

  border-radius: 8px;
  border: 2px solid transparent;

  margin-bottom: 20px;
  &::placeholder {
    color: #aaa;
  }
}
</style>
