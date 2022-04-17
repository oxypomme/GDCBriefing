<template>
	<n-card>
		<n-code :code="sqf" language="sqf" />
	</n-card>
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
