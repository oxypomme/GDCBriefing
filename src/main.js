import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import native from "./plugins/native-ui";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

createApp(App)
	.use(native)
	.component("QuillEditor", QuillEditor)
	.use(store)
	.mount("#app");
