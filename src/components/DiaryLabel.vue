<template>
	<n-input-group>
		<n-input :value="content" @update:value="onContentChange" />
		<n-button type="error" @click="onDeletePressed">
			<n-icon>
				<TrashAlt />
			</n-icon>
		</n-button>
	</n-input-group>
</template>

<script>
import { defineComponent, ref } from "vue";
import { debounce } from "lodash";
import { useStore } from "vuex";
import { TrashAlt } from "@vicons/fa";

let store;
const updateStore = debounce((key, value) => {
	store?.commit("setDiaryName", {
		key,
		value,
	});
}, 1000);

export default defineComponent({
	components: {
		TrashAlt,
	},
	props: {
		diary: Object,
	},
	setup(props) {
		store = useStore();
		const content = ref(props.diary.name);

		return {
			content,
			onContentChange: (val) => {
				content.value = val;
				updateStore(props.diary.key, content.value);
			},
			onDeletePressed: () => {
				store.commit("deleteDiary", { key: props.diary.key });
			},
		};
	},
});
</script>
