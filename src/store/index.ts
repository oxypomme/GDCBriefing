import { toSQF } from "@/js/SQFconverter";
import type Delta from "quill-delta";
import { v4 as uuidv4 } from "uuid";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

const lsKey = "gdcBriefingDiaries";

export type Diary = {
	name: string;
	key: string;
	content?: Delta;
};

const firstUUID = uuidv4();
const initialState = {
	diaries: [{ key: firstUUID, name: "Entrée 0" }] as Diary[],
	currentDiary: 0,
	editPending: false,
};
export type State = typeof initialState;

const state = { ...initialState };
const lsDiaries = localStorage.getItem(lsKey);
if (lsDiaries) {
	state.diaries = JSON.parse(lsDiaries);
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
	},
	actions: {
		saveState({ state }) {
			localStorage.setItem(lsKey, JSON.stringify(state.diaries));
		},
		addDiary({ commit, dispatch, state }) {
			const key = uuidv4();
			dispatch("setDiary", {
				key,
				name: `Entrée ${state.diaries.length}`,
			});
			commit("setCurrentDiary", { key });
		},
		setDiary({ commit, dispatch }, payload) {
			commit("setDiary", payload);
			dispatch("saveState");
			commit("setUnsavedStatus", { status: false });
		},
		deleteDiary({ commit, dispatch }, payload) {
			commit("deleteDiary", payload);
			dispatch("saveState");
		},
		clearData({ commit, dispatch }) {
			commit("clearData");
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
		getUnsaved: (state) => state.editPending,
	},
});

// define your own `useStore` composition function
export function useStore() {
	return baseUseStore(key);
}
