export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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

  modules: ["@vueuse/nuxt", "@nuxtjs/sanity"],

  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    useCdn: false,
    apiVersion: process.env.NUXT_SANITY_API_VERSION || "2024-03-15",
    // visualEditing: {
    //   studioUrl: process.env.NUXT_SANITY_STUDIO_URL || "http://localhost:3333",
    //   token: process.env.NUXT_SANITY_API_READ_TOKEN,
    //   stega: true,
    // },
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
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    dirs: ["./utils/**"],
  },

  watch: ["assets/css/tokens.json"],
  compatibilityDate: "2024-07-08",
});