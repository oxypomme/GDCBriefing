<template>
	<n-config-provider :hljs="hljs" :theme="theme">
		<App />
	</n-config-provider>
</template>

<script lang="ts">
import { darkTheme } from "naive-ui";
import { computed, defineComponent } from "vue";
import App from "./App.vue";
import hljs from "./plugins/hljs";
import { useStore } from "./store";

export default defineComponent({
	components: { App },
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
