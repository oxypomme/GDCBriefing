import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default createStore({
	state,
	mutations,
	actions,
	getters,
});
