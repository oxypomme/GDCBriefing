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

<script>
import { defineComponent } from "vue";
import { Plus } from "@vicons/fa";

export default defineComponent({
	components: {
		Plus,
	},
	setup: () => ({
		onAddClicked() {},
	}),
});
</script>
