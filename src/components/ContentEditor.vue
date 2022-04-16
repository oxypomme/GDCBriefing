<template>
	<quill-editor v-model:content="content" :options="options"></quill-editor>
</template>

<script>
import { debounce } from "lodash";
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from "vuex";

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

let store;
const updateStore = debounce((key, value) => {
	store?.commit("setDiaryContent", {
		key,
		value,
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
