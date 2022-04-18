import { v4 as uuidv4 } from "uuid";
import type { Diary } from "./types";

const taninTabs = [
	"Contexte (OPTIONNEL)",
	"Mission",
	"Renseignements",
	"Matériel",
	"Crédits",
];
const diaries: Diary[] = [];

for (const name of taninTabs) {
	diaries.push({
		key: uuidv4(),
		name,
	});
}

export default {
	diaries,
	currentDiary: 0,
	editPending: false,
};
