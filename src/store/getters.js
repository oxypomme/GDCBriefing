export default {
	getDiaries: (state) => state.diaries,
	getDiariesList: (state) =>
		state.diaries.map(({ name }, i) => ({ name, key: i })),
	getCurrentDiary: (state, getters) =>
		state.currentDiary !== null
			? getters.getDiariesList[state.currentDiary] ?? {}
			: getters.getDiariesList[0],
};
