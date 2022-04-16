export default {
	setCurrentDiary(state, { key }) {
		if (typeof key === "number" && state.diaries[key]) {
			state.currentDiary = key;
		}
	},
	setDiaryName(state, { key, value }) {
		if (typeof key === "number" && state.diaries[key]) {
			state.diaries[key].name = value;
		}
	},
	setDiaryContent(state, { key, value }) {
		if (typeof key === "number" && state.diaries[key]) {
			state.diaries[key].content = value;
		}
	},
	addDiary(state) {
		const index = state.diaries.length;
		state.diaries.push({
			name: `Entrée ${index}`,
			content: "",
		});
	},
	deleteDiary(state, { key }) {
		if (typeof key === "number" && state.diaries[key]) {
			state.diaries.splice(key);
			if (state.currentDiary === key) {
				state.currentDiary = 0;
			}
		}
	},
};
