import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.10.3_@parcel+watcher@2.4.1_@types+node@20.11.25_encoding@0.1.13_rollup@4.12.1_terser@5_6mds264eqtls6pjmy6jomnvjly/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}