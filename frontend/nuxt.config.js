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
  },
  css: ["@/assets/css/index.css"],
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/sanity"],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: process.env.NUXT_SANITY_API_VERSION || "2024-03-15",
    visualEditing: {
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL || "http://localhost:3333",
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      stega: true,
    },
  },
  tailwindcss: {
    // cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
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
});