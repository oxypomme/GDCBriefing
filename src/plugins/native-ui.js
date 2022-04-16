import {
	create,
	NButton,
	NIcon,
	NInput,
	NInputGroup,
	NLayout,
	NLayoutSider,
	NMenu,
	NTabs,
	NTabPane,
	NCode,
	NConfigProvider,
} from "naive-ui";

const components = [
	NLayout,
	NLayoutSider,
	NMenu,
	NInput,
	NInputGroup,
	NButton,
	NIcon,
	NTabs,
	NTabPane,
	NCode,
	NConfigProvider,
];
const naive = create({
	components,
});

export default naive;
