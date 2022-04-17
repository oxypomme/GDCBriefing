<template>
	<n-button @click="onAddClicked" type="primary">
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
				store.commit("addDiary");
			},
		};
	},
});
</script>
