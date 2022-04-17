import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createApp } from "vue";
import App from "./MainApp.vue";
import naive from "./plugins/naive-ui";
import { key, store } from "./store";

createApp(App)
	.use(naive)
	.component("QuillEditor", QuillEditor)
	.use(store, key)
	.mount("#app");
