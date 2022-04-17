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
	NSpace,
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
	NSpace,
];
const naive = create({
	components,
});

export default naive;
