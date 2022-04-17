<template>
	<n-config-provider :hljs="hljs">
		<n-layout has-sider>
			<n-layout-sider bordered height="100%">
				<DiaryRecords />
				<AddDiaryButton />
			</n-layout-sider>
			<n-layout style="margin: 0 1rem">
				<n-tabs animated v-if="isCurrentDiary">
					<n-tab-pane name="content" tab="Editeur">
						<ContentEditor />
					</n-tab-pane>
					<n-tab-pane name="sqf" tab="SQF">
						<SQFView />
					</n-tab-pane>
				</n-tabs>
			</n-layout>
		</n-layout>
	</n-config-provider>
</template>

<script lang="ts">
import { useStore } from "@/store";
import hljs from "highlight.js/lib/core";
import sqf from "highlight.js/lib/languages/sqf";
import { computed, defineComponent } from "vue";
import AddDiaryButton from "./components/AddDiaryButton.vue";
import ContentEditor from "./components/ContentEditor.vue";
import DiaryRecords from "./components/DiaryRecords.vue";
import SQFView from "./components/SQFView.vue";

hljs.registerLanguage("sqf", sqf);

export default defineComponent({
	components: { DiaryRecords, ContentEditor, SQFView, AddDiaryButton },
	setup: () => {
		const store = useStore();
		return {
			// Data
			hljs,
			// Computed
			isCurrentDiary: computed(
				() => !isNaN(+store.getters.getCurrentDiary?.key)
			),
		};
	},
});
</script>

<style>
#app {
	height: 100vh;
}
</style>
