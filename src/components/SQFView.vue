<template>
	<n-code style="flex: 1" :code="sqf" language="sqf" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
	setup: () => {
		const store = useStore();
		return {
			sqf: computed(() => {
				const data = store.getters.getSQF;
				return data.join("\n\n");
			}),
		};
	},
});
</script>