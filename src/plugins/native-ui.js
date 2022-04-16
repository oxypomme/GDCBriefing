import {
	create,
	NButton,
	NIcon,
	NInput,
	NInputGroup,
	NLayout,
	NLayoutSider,
	NMenu,
} from "naive-ui";

const components = [
	NLayout,
	NLayoutSider,
	NMenu,
	NInput,
	NInputGroup,
	NButton,
	NIcon,
];
const naive = create({
	components,
});

export default naive;
