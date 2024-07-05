<script setup lang="ts">
const route = useRoute()
// const { enabled: previewEnabled, inFrame } = useSanityVisualEditingState()
</script>
<template>
  <!-- <a v-if="previewEnabled && !inFrame" :href="`/preview/disable?redirect=${route.fullPath}`" class="preview-toggle">
    <span>Preview Enabled</span>
    <span>Disable Preview</span>
  </a> -->
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
