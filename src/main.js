import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import "./registerServiceWorker";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(Toast);
app.mount("#app");
