<script setup>
const runtimeConfig = useRuntimeConfig();


useHead({
  title: 'Beatrice Gaspari Illustration',
  htmlAttrs: {
    lang: 'en-gb'
  },
  meta: [
    { charset: "UTF-8" },
    { name: 'description', content: 'Beatrice Gaspari Illustration' },
    // { name: 'keywords', content: 'Frontend Development, Frontend Developer, Digital Designer, Digital Design, Visual Developer, RCA, Royal College of Art, Politecnico di Milano, Art & Technology, Website Development, Web Design, Graphic Design, Introspective Design, Visual Communication, Schema Design' }
  ],
  link: [
    { rel: 'canonical', href: runtimeConfig?.public?.FRONT_END_URL },
    {
      rel: 'preload',
      type: 'font/woff',
      href: '/fonts/ArialNarrow-Regular.woff',
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/woff',
      href: '/fonts/Piscolabis-Regular.woff',
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: '/fonts/Piscolabis-Regular.woff2',
      as: 'font',
      crossorigin: ''
    }

  ]
})
// const { enabled: previewEnabled, inFrame } = useSanityVisualEditingState()
</script>
<template>
  <!-- <a v-if="previewEnabled && !inFrame" :href="`/preview/disable?redirect=${route.fullPath}`" class="preview-toggle">
    <span>Preview Enabled</span>
    <span>Disable Preview</span>
  </a> -->
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'page',
      mode: 'out-in'
    }" />
  </NuxtLayout>
</template>
<style>
.page-enter-active {
  transition: all 0.2s;
}

.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.3rem);
}

</style>
