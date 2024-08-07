<script setup>
// const runtimeConfig = useRuntimeConfig();


// useSeoMeta({
//   ogTitle: 'Beatrice Gaspari',
//   description: 'Digital Portfolio of the Italian illustrator Beatrice Gaspari',
//   ogDescription: 'Digital Portfolio of the Italian illustrator Beatrice Gaspari',
//   ogImage: '~/images/favicon.png',
// })
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
