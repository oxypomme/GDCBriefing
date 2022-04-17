<template>
	<n-button
		@click="onAddClicked"
		type="primary"
		style="display: flex; margin: 0 auto"
	>
		<template #icon>
			<n-icon>
				<Plus />
			</n-icon>
		</template>
		Ajouter une entrée
	</n-button>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Plus } from "@vicons/fa";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		Plus,
	},
	setup: () => {
		const store = useStore();
		return {
			onAddClicked() {
				store.dispatch("addDiary");
			},
		};
	},
});
</script>
