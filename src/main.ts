import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createApp } from "vue";
import App from "./App.vue";
import native from "./plugins/native-ui";
import { key, store } from "./store";

createApp(App)
	.use(native)
	.component("QuillEditor", QuillEditor)
	.use(store, key)
	.mount("#app");
