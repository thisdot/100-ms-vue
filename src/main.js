import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./registerServiceWorker";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");
