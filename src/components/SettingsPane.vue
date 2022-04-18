<template>
	<n-checkbox v-model:checked="isDark">
		<n-icon><Moon v-if="isDark" /> <Sun v-else /></n-icon>
		Mode {{ isDark ? "sombre" : "lumineux" }} (BETA)
	</n-checkbox>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Moon, Sun } from "@vicons/fa";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	components: {
		Sun,
		Moon,
	},
	setup: () => {
		const store = useStore();

		const isDark = ref(store.getters.getSettings.isDark);
		watch(isDark, (newValue) => {
			store.dispatch("setSettings", { isDark: newValue });
		});

		return {
			// Data
			isDark,
		};
	},
});
</script>
