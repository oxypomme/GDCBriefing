import {
	create,
	NButton,
	NCode,
	NConfigProvider,
	NIcon,
	NInput,
	NInputGroup,
	NLayout,
	NLayoutSider,
	NMenu,
	NTabPane,
	NTabs,
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
