import { toSQF } from "@/js/SQFconverter";
import type Delta from "quill-delta";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

const lsKey = "gdcBriefingDiaries";

export type Diary = {
	name: string;
	key: number;
	content?: Delta;
};

const state = {
	diaries: [{ key: 0, name: "Entrée 0" }] as Diary[],
	currentDiary: 0,
};
export type State = typeof state;

const lsDiaries = localStorage.getItem(lsKey);
if (lsDiaries) {
	state.diaries = JSON.parse(lsDiaries);
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state,
	mutations: {
		setCurrentDiary(state, { key }: Pick<Diary, "key">) {
			if (state.diaries[key]) {
				state.currentDiary = key;
			}
		},
		setDiary(state, { key, ...diary }: Partial<Diary> & Pick<Diary, "key">) {
			state.diaries[key] = {
				...(state.diaries[key] ?? { key }),
				...diary,
			};
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
	actions: {
		saveState({ state }) {
			localStorage.setItem(lsKey, JSON.stringify(state.diaries));
		},
		addDiary({ commit, dispatch, state }) {
			const index = state.diaries.length;
			dispatch("setDiary", {
				key: index,
				name: `Entrée ${index}`,
			});
			commit("setCurrentDiary", { key: index });
		},
		setDiary({ commit, dispatch }, payload) {
			commit("setDiary", payload);
			dispatch("saveState");
		},
		deleteDiary({ commit, dispatch }, payload) {
			commit("deleteDiary", payload);
			dispatch("saveState");
		},
	},
	getters: {
		getDiariesList: (state) =>
			state.diaries.map(({ name, key }) => ({ name, key })),
		// Selected Diray
		getCurrentDiary: (state, getters) =>
			getters.getDiariesList[state.currentDiary] ?? {},
		getCurrentDiaryContent: (state) => {
			if (state.diaries[state.currentDiary]) {
				const { key, content } = state.diaries[state.currentDiary];
				return { key, content };
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
