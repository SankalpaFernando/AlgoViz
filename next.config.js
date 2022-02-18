/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
});
