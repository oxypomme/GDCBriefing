/* eslint-disable @typescript-eslint/no-var-requires */
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");
const Components = require("unplugin-vue-components/webpack");

module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/GDCBriefing/" : "/",
	configureWebpack: {
		plugins: [
			Components({
				dts: true,
				resolvers: [NaiveUiResolver()],
			}),
		],
	},
};
