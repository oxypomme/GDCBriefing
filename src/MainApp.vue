<template>
	<n-config-provider :hljs="hljs">
		<App />
	</n-config-provider>
</template>

<script lang="ts">
import hljs from "highlight.js/lib/core";
import sqf from "highlight.js/lib/languages/sqf";
import { NConfigProvider } from "naive-ui";
import { defineComponent } from "vue";
import App from "./App.vue";

hljs.registerLanguage("sqf", sqf);

export default defineComponent({
	components: { App, NConfigProvider },
	setup: () => ({
		// Data
		hljs,
	}),
});
</script>

<style>
#app,
#app > *,
#app > * > * {
	height: 100vh;
}
</style>
