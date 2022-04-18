import { toSQF } from "@/js/SQFconverter";
import { cloneDeep } from "lodash";
import type Delta from "quill-delta";
import { v4 as uuidv4 } from "uuid";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import initialState from "./intitial";
import type { Diary } from "./types";

const lsKey = "gdcBriefing";

const state = cloneDeep(initialState);
export type State = typeof initialState;

const lsDiaries = localStorage.getItem(lsKey + "Diaries");
if (lsDiaries) {
	state.diaries = JSON.parse(lsDiaries);
}

const lsSettings = localStorage.getItem(lsKey + "Settings");
if (lsSettings) {
	state.settings = JSON.parse(lsSettings);
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state,
	mutations: {
		setCurrentDiary(state, { key }: Pick<Diary, "key">) {
			const index = state.diaries.findIndex(({ key: k }) => k === key);
			if (index >= 0) {
				state.currentDiary = index;
			}
		},
		setDiary(state, { key, ...diary }: Partial<Diary> & Pick<Diary, "key">) {
			let index = state.diaries.findIndex(({ key: k }) => k === key);
			if (index < 0) {
				index = state.diaries.length;
			}

			state.diaries[index] = {
				...(state.diaries[index] ?? { key }),
				...diary,
			};
		},
		deleteDiary(state, { key }: Pick<Diary, "key">) {
			const index = state.diaries.findIndex(({ key: k }) => k === key);
			if (index >= 0) {
				state.diaries.splice(index, 1);
				if (state.currentDiary === index) {
					state.currentDiary = index - 1;
				}
			}
		},
		setUnsavedStatus(state, { status }: { status: boolean }) {
			state.editPending = status;
		},
		clearData(state) {
			state.currentDiary = initialState.currentDiary;
			state.diaries = initialState.diaries;
			state.editPending = initialState.editPending;
		},
		setSettings: (state, settings: State["settings"]) => {
			state.settings = {
				...state.settings,
				...settings,
			};
		},
	},
	actions: {
		saveState: ({ state }) => {
			localStorage.setItem(lsKey + "Diaries", JSON.stringify(state.diaries));
		},
		saveSettings: ({ state }) => {
			localStorage.setItem(lsKey + "Settings", JSON.stringify(state.settings));
		},
		addDiary: ({ commit, dispatch, state }) => {
			const key = uuidv4();
			dispatch("setDiary", {
				key,
				name: `Entrée ${state.diaries.length}`,
			});
			commit("setCurrentDiary", { key });
		},
		setDiary: ({ commit, dispatch }, payload) => {
			commit("setDiary", payload);
			dispatch("saveState");
			commit("setUnsavedStatus", { status: false });
		},
		deleteDiary: ({ commit, dispatch }, payload) => {
			commit("deleteDiary", payload);
			dispatch("saveState");
		},
		clearData: ({ commit, dispatch }) => {
			commit("clearData");
			dispatch("saveState");
		},
		setSettings: ({ commit, dispatch }, payload) => {
			commit("setSettings", payload);
			dispatch("saveSettings");
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
		getUnsaved: (state) => state.editPending,
		// Settings
		getSettings: (state) => state.settings,
	},
});

// define your own `useStore` composition function
export function useStore() {
	return baseUseStore(key);
}
