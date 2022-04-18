<template>
	<n-grid x-gap="12" :cols="2">
		<n-gi style="height: fit-content">
			<quill-editor
				ref="editor"
				v-model:content="content"
				:options="options"
			></quill-editor>
		</n-gi>
		<n-gi style="height: 100%">
			<n-card style="height: 100%">
				<n-scrollbar>
					<n-code :code="sqf" language="sqf" />
				</n-scrollbar>
			</n-card>
		</n-gi>
	</n-grid>
</template>

<script lang="ts">
import { State, useStore } from "@/store";
import type { Diary } from "@/store/types";
import type { Quill } from "@vueup/vue-quill";
import { debounce } from "lodash";
import { NGi, NGrid, NScrollbar } from "naive-ui";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import type { Store } from "vuex";

// quill options
const options = {
	modules: {
		toolbar: [
			{ color: [] },
			// { font: [] },
			{ header: [4, false] },
			{ size: [] },
		],
	},
};

let store: Store<State>;
const updateStore = debounce((key, value) => {
	return store?.dispatch("setDiary", {
		key,
		content: value,
	});
}, 1000);

export default defineComponent({
	components: { NGrid, NGi, NScrollbar },
	setup: () => {
		store = useStore();
		const diary = computed(
			() =>
				store.getters.getCurrentDiaryContent as Pick<Diary, "key" | "content">
		);
		const sqf = computed(() => store.getters.getCurrentDiarySQF);

		let diaryLock = false;
		let contentLock = false;
		// Update editor when current diary is changed
		const editor: Ref<Quill> = ref(null);
		watch(diary, (newValue) => {
			if (!diaryLock) {
				// Avoiding store updates on current diary change
				contentLock = true;
				// Set content of the editor
				editor.value.setContents(newValue.content, "silent");
				// Re-Allowing store updates
				contentLock = false;
			} else {
				// Re-Allowing store updates after content change
				diaryLock = false;
			}
		});

		const content = ref(diary.value.content);
		// Update store when content changes
		watch(content, async (newValue) => {
			if (diary.value && !contentLock) {
				store.commit("setUnsavedStatus", { status: true });
				// Avoiding content update when useless
				diaryLock = true;
				// Update store
				updateStore(diary.value.key, newValue);
			}
		});

		return {
			// Data
			options,
			content,
			// Computed
			sqf,
			// Refs
			editor,
		};
	},
});
</script>
