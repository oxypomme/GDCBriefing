import { toSQF } from "../js/SQFconverter";

export default {
	getDiariesList: (state) => state.diaries.map(({ name }) => ({ name })),
	// Selected Diray
	getCurrentDiary: (state, getters) =>
		getters.getDiariesList[state.currentDiary] ?? {},
	getCurrentDiaryContent: (state) => {
		const { key, content, name } = state.diaries[state.currentDiary];
		return { key, content, name };
	},
	// SQF
	getSQF: (state) =>
		state.diaries.map(({ name, content }) => toSQF(name, content)),
	getCurrentDiarySQF: (state, getters) => getters.getSQF[state.currentDiary],
};
