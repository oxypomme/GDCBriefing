<template>
	<n-menu
		:value="currentDiary.key"
		@update:value="onDiarySelected"
		:options="diaries"
	/>
</template>

<script lang="ts">
import { useStore } from "@/store";
import type { Diary } from "@/store/types";
import { FileAltRegular } from "@vicons/fa";
import { NIcon } from "naive-ui";
import { Component, computed, defineComponent, h } from "vue";
import DiaryLabel from "./DiaryLabel.vue";

const renderIcon = (icon: Component) => () =>
	h(NIcon, null, { default: () => h(icon) });

export default defineComponent({
	setup: () => {
		const store = useStore();
		return {
			// Computed
			diaries: computed(
				() =>
					(store.getters.getDiaries as Diary[])?.map(
						({ name, key }, i, list) => ({
							name,
							key,
							icon: renderIcon(FileAltRegular),
							label: () =>
								h(DiaryLabel, {
									diary: { name, key },
									disabled: list.length === 1,
								}),
						})
					) ?? []
			),
			currentDiary: computed(() => store.getters.getCurrentDiary),
			// Methods
			onDiarySelected: (key: number) => {
				store.commit("setCurrentDiary", { key });
			},
		};
	},
});
</script>
