<script setup>
const runtimeConfig = useRuntimeConfig();

useHead({
  title: 'Beatrice Gaspari Illustration',
  htmlAttrs: {
    lang: 'en-gb'
  },
  link: [
    { rel: 'canonical', href: runtimeConfig?.public?.FRONT_END_URL },
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
    <NuxtPage />
  </NuxtLayout>
</template>
<style scoped></style>
