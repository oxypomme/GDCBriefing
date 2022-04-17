<template>
	<quill-editor v-model:content="content" :options="options"></quill-editor>
</template>

<script lang="ts">
import { State, useStore } from "@/store";
import { debounce } from "lodash";
import { computed, defineComponent, ref, watch } from "vue";
import type { Store } from "vuex";

// quill options
const options = {
	modules: {
		toolbar: [
			{ color: [] },
			{ font: [] },
			{ header: [4, false] },
			{ size: [] },
		],
	},
};

let store: Store<State>;
const updateStore = debounce((key, value) => {
	store?.dispatch("setDiary", {
		key,
		content: value,
	});
}, 1000);

export default defineComponent({
	setup: () => {
		store = useStore();
		const diary = computed(() => store.getters.getCurrentDiaryContent);
		const content = ref(diary.value.content);

		watch(content, (newValue) => {
			if (diary.value) {
				updateStore(diary.value.key, newValue);
			}
		});

		return {
			// Data
			options,
			content,
		};
	},
});
</script>
