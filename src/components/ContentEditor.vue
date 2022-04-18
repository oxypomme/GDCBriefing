<template>
	<n-grid x-gap="12" :cols="2">
		<n-gi style="height: fit-content">
			<quill-editor
				ref="editor"
				@textChange="onTextChange"
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
import type { Delta, Quill } from "@vueup/vue-quill";
import { debounce } from "lodash";
import { NGi, NGrid, NScrollbar } from "naive-ui";
import { computed, defineComponent, onMounted, Ref, ref, watch } from "vue";
import type { Store } from "vuex";

// quill options
const options = {
	modules: {
		history: {
			userOnly: true,
		},
		toolbar: [
			{ color: [] },
			// { font: [] },
			{ header: [4, false] },
			{ size: [] },
		],
	},
};
// quill types
type TextChangeEvent = {
	delta: Delta;
	oldContents: Delta;
	source: "api" | "user" | "silent";
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
		const diary = computed(() => store.getters.getCurrentDiary as Diary);
		const sqf = computed(() => store.getters.getCurrentDiarySQF);

		const editor: Ref<Quill> = ref(null);
		// Update editor when current diary is changed
		const updateContent = () => {
			editor.value.setContents(diary.value.content, "silent");
		};
		watch(diary, updateContent);
		// Update editor when component is mounted
		onMounted(updateContent);

		return {
			// Data
			options,
			// Computed
			sqf,
			// Methods
			onTextChange: ({ source }: TextChangeEvent) => {
				// Update store when content changes is made by user
				if (source === "user") {
					updateStore(diary.value.key, editor.value.getContents());
				}
			},
			// Refs
			editor,
		};
	},
});
</script>
