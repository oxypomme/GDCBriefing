<template>
	<n-config-provider :hljs="hljs" :theme="theme">
		<App />
	</n-config-provider>
</template>

<script lang="ts">
import hljs from "highlight.js/lib/core";
import sqf from "highlight.js/lib/languages/sqf";
import { darkTheme, NConfigProvider } from "naive-ui";
import { computed, defineComponent } from "vue";
import App from "./App.vue";
import { useStore } from "./store";

hljs.registerLanguage("sqf", sqf);

export default defineComponent({
	components: { App, NConfigProvider },
	setup: () => {
		const store = useStore();

		return {
			// Data
			hljs,
			// Computed
			theme: computed(() =>
				store.getters.getSettings.isDark ? darkTheme : null
			),
		};
	},
});
</script>

<style>
#app,
#app > *,
#app > * > * {
	height: 100vh;
}
</style>
