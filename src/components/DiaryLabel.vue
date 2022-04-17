<template>
	<n-input-group>
		<n-input :value="content" @update:value="onContentChange" />
		<n-button ghost type="error" @click="onDeletePressed" :disabled="disabled">
			<n-icon>
				<TrashAlt />
			</n-icon>
		</n-button>
	</n-input-group>
</template>

<script lang="ts">
import { State, useStore } from "@/store";
import { TrashAlt } from "@vicons/fa";
import { debounce } from "lodash";
import { defineComponent, ref } from "vue";
import type { Store } from "vuex";

let store: Store<State>;
const updateStore = debounce(async (key, value) => {
	await store?.dispatch("setDiary", {
		key,
		name: value,
	});
}, 1000);

export default defineComponent({
	components: {
		TrashAlt,
	},
	props: {
		diary: Object,
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup: (props) => {
		store = useStore();
		const content = ref(props?.diary?.name);

		return {
			// Data
			content,
			// Methods
			onContentChange: (val: string) => {
				if (props?.diary) {
					content.value = val;
					store.commit("setUnsavedStatus", { status: true });
					updateStore(props.diary.key, content.value);
				}
			},
			onDeletePressed: () => {
				if (props?.diary) {
					store.dispatch("deleteDiary", { key: props.diary.key });
				}
			},
		};
	},
});
</script>
