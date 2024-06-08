export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, viewport-fit=cover",
				},
			],
		},
	},
	runtimeConfig: {
		public: {
			baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
		},
		basicAuth: process.env.BASIC_AUTH,
	},
	css: ["@/assets/css/index.css"],
	modules: ["@vueuse/nuxt", "@unocss/nuxt"],
	postcss: {
		plugins: {
			"./postcss-get-tokens": {
				path: "./assets/css/tokens.json",
			},
			"postcss-nested": {},
			"postcss-preset-env": {
				stage: 0,
				features: {
					"nesting-rules": false,
				},
			},
		},
	},
	imports: {
		dirs: ["./utils/**"],
	},
	watch: ["assets/css/tokens.json"],
})
