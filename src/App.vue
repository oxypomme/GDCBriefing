<template>
	<n-layout has-sider>
		<n-layout-sider bordered height="100%">
			<DiaryRecords />
		</n-layout-sider>
		<n-layout>
			<ContentEditor />
			<SQFEditor />
		</n-layout>
	</n-layout>
</template>

<script>
import DiaryRecords from "./components/DiaryRecords.vue";
import ContentEditor from "./components/ContentEditor.vue";
import SQFEditor from "./components/SQFEditor.vue";
export default { components: { DiaryRecords, ContentEditor, SQFEditor } };
</script>
