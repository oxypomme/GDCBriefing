<template>
	<n-code style="flex: 1" :code="sqf" language="sqf" />
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

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
