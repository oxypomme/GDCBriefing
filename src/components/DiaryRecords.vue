<template>
	<n-menu
		:value="currentDiary.key"
		@update:value="onDiarySelected"
		:options="diaries"
	/>
</template>

<script>
import { NIcon } from "naive-ui";
import { computed, defineComponent, h } from "vue";
import { useStore } from "vuex";
import { FileAltRegular } from "@vicons/fa";
import DiaryLabel from "./DiaryLabel.vue";

const renderIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) });

export default defineComponent({
	setup() {
		const store = useStore();
		return {
			// Computed
			diaries: computed(() =>
				store.getters.getDiariesList.map((d) => ({
					...d,
					icon: renderIcon(FileAltRegular),
					label: () =>
						h(DiaryLabel, {
							diary: d,
						}),
				}))
			),
			currentDiary: computed(() => store.getters.getCurrentDiary),
			// Methods
			onDiarySelected: (key) => {
				store.commit("setCurrentDiary", { key });
			},
		};
	},
});
</script>
