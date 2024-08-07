export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en-gb",
      },
      meta: [
        { charset: "UTF-8" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "keywords",
          content:
            "illustration, pastel illustration, watercolor, editorial illustration, digital painting, analog illustration, ink painting, ink illustration, sketching, charcoal drawing, acrylic painting, gouache illustration, concept art, character design, landscape illustration, portrait illustration, abstract illustration, mixed media art, contemporary illustration, graphic illustration, surreal illustration, fantasy illustration, comic art, storyboard illustration, childrens book illustration",
        },
      ],
      link: [
        {
          rel: "preload",
          type: "font/woff",
          href: "/fonts/ArialNarrow-Regular.woff",
          as: "font",
          crossorigin: "",
        },
        {
          rel: "preload",
          type: "font/woff",
          href: "/fonts/Piscolabis-Regular.woff",
          as: "font",
          crossorigin: "",
        },
        {
          rel: "preload",
          type: "font/woff2",
          href: "/fonts/Piscolabis-Regular.woff2",
          as: "font",
          crossorigin: "",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl:
        process.env.NUXT_PUBLIC_BASE_URL
    },
  },
  css: ["@/assets/css/index.css"],
  modules: ["@vueuse/nuxt", "@nuxtjs/sanity", "@nuxtjs/seo", "nuxt-vitalizer"],
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
  devtools: { enabled: false },
  // nitro: {
  //   static: true,
  // },
  // site: {
  //   url: "https://beatricegaspari.com",
  //   name: "Beatrice Gaspari",
  //   description:
  //     "Digital Portfolio of the Italian illustrator Beatrice Gaspari",
  //   defaultLocale: "en",
  // },
});
