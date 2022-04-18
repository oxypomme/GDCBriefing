<template>
	<n-checkbox v-model:checked="isDark">
		<n-icon><Moon v-if="isDark" /> <Sun v-else /></n-icon>
		Mode {{ isDark ? "sombre" : "lumineux" }}
	</n-checkbox>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Moon, Sun } from "@vicons/fa";
import { NCheckbox } from "naive-ui";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	components: {
		NCheckbox,
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
