<template>
	<n-config-provider :hljs="hljs">
		<n-layout has-sider>
			<n-layout-sider bordered height="100%">
				<DiaryRecords />
				<AddDiaryButton />
			</n-layout-sider>
			<n-layout style="margin: 0 1rem">
				<n-tabs animated>
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

<script>
import DiaryRecords from "./components/DiaryRecords.vue";
import ContentEditor from "./components/ContentEditor.vue";
import SQFView from "./components/SQFView.vue";
import { defineComponent } from "vue";

import hljs from "highlight.js/lib/core";
import sqf from "highlight.js/lib/languages/sqf";
import AddDiaryButton from "./components/AddDiaryButton.vue";

hljs.registerLanguage("sqf", sqf);

export default defineComponent({
	components: { DiaryRecords, ContentEditor, SQFView, AddDiaryButton },
	setup() {
		return {
			hljs,
		};
	},
});
</script>
