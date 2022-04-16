import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import native from './plugins/native-ui';

createApp(App).use(native).use(store).mount("#app");
