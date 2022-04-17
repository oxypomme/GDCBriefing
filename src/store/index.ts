import { toSQF } from "@/js/SQFconverter";
import type Delta from "quill-delta";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export type Diary = {
	name: string;
	key: number;
	content?: Delta;
};

const state = {
	diaries: [] as Diary[],
	currentDiary: 0,
};

export type State = typeof state;

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state,
	mutations: {
		setCurrentDiary(state, { key }: Pick<Diary, "key">) {
			if (typeof key === "number" && state.diaries[key]) {
				state.currentDiary = key;
			}
		},
		setDiaryName(
			state,
			{ key, value }: Pick<Diary, "key"> & { value: string }
		) {
			if (typeof key === "number" && state.diaries[key]) {
				state.diaries[key].name = value;
			}
		},
		setDiaryContent(
			state,
			{ key, value }: Pick<Diary, "key"> & { value: Delta }
		) {
			if (typeof key === "number" && state.diaries[key]) {
				state.diaries[key].content = value;
			}
		},
		addDiary(state) {
			const index = state.diaries.length;
			state.diaries.push({
				key: index,
				name: `Entrée ${index}`,
			});
			state.currentDiary = index;
		},
		deleteDiary(state, { key }: Pick<Diary, "key">) {
			if (typeof key === "number" && state.diaries[key]) {
				state.diaries.splice(key);
				if (state.currentDiary === key) {
					state.currentDiary = 0;
				}
			}
		},
	},
	actions: {},
	getters: {
		getDiariesList: (state) =>
			state.diaries.map(({ name, key }) => ({ name, key })),
		// Selected Diray
		getCurrentDiary: (state, getters) =>
			getters.getDiariesList[state.currentDiary] ?? {},
		getCurrentDiaryContent: (state) => {
			if (state.diaries[state.currentDiary]) {
				const { key, content, name } = state.diaries[state.currentDiary];
				return { key, content, name };
			}
			return {};
		},
		// SQF
		getSQF: (state) =>
			state.diaries.map(({ name, content }) => toSQF(name, content as Delta)),
		getCurrentDiarySQF: (state, getters) => getters.getSQF[state.currentDiary],
	},
});

// define your own `useStore` composition function
export function useStore() {
	return baseUseStore(key);
}
