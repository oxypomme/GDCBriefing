<template>
	<n-layout has-sider>
		<n-layout-sider bordered height="100%">
			<DiaryRecords />
			<AddDiaryButton />
		</n-layout-sider>
		<n-layout style="margin: 0 1rem">
			<n-tabs animated>
				<n-tab-pane name="content" tab="Editeur" :disabled="!isCurrentDiary">
					<ContentEditor v-if="isCurrentDiary" />
				</n-tab-pane>
				<n-tab-pane name="sqf" tab="SQF">
					<SQFView />
				</n-tab-pane>
				<n-tab-pane name="settings" tab="Paramètres">
					<SettingsPane />
				</n-tab-pane>
				<n-tab-pane
					v-if="unsaved"
					name="nsaved"
					tab="Modifications non enregistrées"
					disabled
				>
					<SettingsPane />
				</n-tab-pane>
			</n-tabs>
		</n-layout>
	</n-layout>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import AddDiaryButton from "./components/AddDiaryButton.vue";
import ContentEditor from "./components/ContentEditor.vue";
import DiaryRecords from "./components/DiaryRecords.vue";
import SettingsPane from "./components/SettingsPane.vue";
import SQFView from "./components/SQFView.vue";

export default defineComponent({
	components: {
		DiaryRecords,
		ContentEditor,
		SQFView,
		SettingsPane,
		AddDiaryButton,
	},
	setup: () => {
		const store = useStore();

		return {
			// Computed
			unsaved: computed(() => store.getters.getUnsaved),
			isCurrentDiary: computed(() => store.getters.getCurrentDiary?.key),
		};
	},
});
</script>

<style>
#app,
#app > *,
#app > * > * {
	height: 100vh;
}
</style>
