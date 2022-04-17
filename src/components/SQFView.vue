<template>
	<n-space vertical>
		<n-space>
			<n-button-group>
				<n-button ghost type="primary" @click="downloadBriefing">
					<template #icon>
						<n-icon>
							<Download />
						</n-icon>
					</template>
					briefing.sqf
				</n-button>
				<n-dropdown
					trigger="hover"
					:options="options"
					:render-label="renderDropdownLabel"
				>
					<n-button ghost type="primary" style="padding: 6px">
						<template #icon>
							<n-icon><CaretDown /></n-icon>
						</template>
					</n-button>
				</n-dropdown>
			</n-button-group>
			<n-popconfirm
				:show-icon="false"
				:negative-text="null"
				@positive-click="clearData"
			>
				<template #activator>
					<n-button type="error" ghost>
						<template #icon>
							<n-icon>
								<Times />
							</n-icon>
						</template>
						Tout supprimer
					</n-button>
				</template>
				Cette action supprimera toute les données et est irréversible,
				voulez-vous continuer ? <br />
				(un rechargemnt de la page est parfois nécéssaire pour voir les
				changements)
			</n-popconfirm>
		</n-space>
		<n-card>
			<n-code :code="sqf" language="sqf" />
		</n-card>
	</n-space>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { CaretDown, Download, Times } from "@vicons/fa";
import { saveAs } from "file-saver";
import {
	DropdownOption,
	NButtonGroup,
	NDropdown,
	NIcon,
	NPopconfirm,
	NTooltip,
} from "naive-ui";
import { Component, computed, defineComponent, h, VNodeChild } from "vue";

const renderIcon = (icon: Component) => () =>
	h(NIcon, null, {
		default: () => h(icon),
	});
/**
 * Create a text file and download it
 *
 * @param filename The name of the file
 * @param content The content of the file
 */
const downloadFile = (filename: string, content: string) =>
	saveAs(new Blob([content], { type: "text/plain;charset=utf-8" }), filename);

// Dropdown options
const options: DropdownOption[] = [
	{
		label: "initPlayerLocal.sqf",
		key: "initPlayerLocal",
		icon: renderIcon(Download),
		tooltip: "Pour le chargement du briefing",
		props: {
			onClick: () => {
				downloadFile("initPlayerLocal.sqf", 'execVM "briefing.sqf";\n');
			},
		},
	},
];

export default defineComponent({
	components: {
		Download,
		Times,
		NDropdown,
		NButtonGroup,
		CaretDown,
		NPopconfirm,
	},
	setup: () => {
		const store = useStore();

		const sqf = computed(() => {
			const data = [...store.getters.getSQF].reverse();
			return data.join("\n\n");
		});

		return {
			// Data
			options,
			// Computed
			sqf,
			// Methods
			renderDropdownLabel: (option: DropdownOption): VNodeChild => {
				if (!option.tooltip) {
					return option.tooltip as VNodeChild;
				}
				return h(NTooltip, null, {
					trigger: () => option.label,
					default: () => option.tooltip,
				});
			},
			downloadBriefing: () => {
				downloadFile("briefing.sqf", sqf.value);
			},
			downloadInitPlayerLocal: () => {
				// Download the file
				saveAs(
					// Create the initPlayerLocal.sqf file
					new Blob(['execVM "briefing.sqf";\n'], {
						type: "text/plain;charset=utf-8",
					}),
					"initPlayerLocal.sqf"
				);
			},
			clearData: () => {
				store.dispatch("clearData");
			},
		};
	},
});
</script>
