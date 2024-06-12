import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["sanity"]?: typeof import("@nuxtjs/sanity").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxtjs/sanity", Exclude<NuxtConfig["sanity"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   sanity: {
      visualEditing: {
         mode: string,

         previewMode: {
            enable: string,

            disable: string,
         },

         proxyEndpoint: string,

         refresh: any,

         studioUrl: string,

         zIndex: any,

         previewModeId: string,

         token: string,
      },
   },
  }
  interface PublicRuntimeConfig {
   baseUrl: string,

   sanity: {
      additionalClients: any,

      apiVersion: string,

      dataset: string,

      disableSmartCdn: boolean,

      perspective: string,

      projectId: string,

      stega: {
         enabled: boolean,

         studioUrl: string,
      },

      token: string,

      useCdn: boolean,

      visualEditing: {
         mode: string,

         previewMode: {
            enable: string,

            disable: string,
         },

         proxyEndpoint: string,

         refresh: any,

         studioUrl: string,

         zIndex: any,
      },

      withCredentials: boolean,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }