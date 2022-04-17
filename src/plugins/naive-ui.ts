import {
	create,
	NButton,
	NCard,
	NCode,
	NConfigProvider,
	NDivider,
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
	NDivider,
	NCard,
];
const naive = create({
	components,
});

export default naive;
