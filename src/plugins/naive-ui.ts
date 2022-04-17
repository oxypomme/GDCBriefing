import {
	create,
	NButton,
	NCard,
	NCode,
	NDivider,
	NIcon,
	NInput,
	NInputGroup,
	NMenu,
	NTabPane,
	NTabs,
} from "naive-ui";

const components = [
	NMenu,
	NInput,
	NInputGroup,
	NButton,
	NIcon,
	NTabs,
	NTabPane,
	NCode,
	NDivider,
	NCard,
];
const naive = create({
	components,
});

export default naive;
