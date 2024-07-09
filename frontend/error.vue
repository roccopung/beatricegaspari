<script setup>
const props = defineProps({
  error: Object,
})
</script>

<template>
  <NuxtLayout>
    <div v-html="`Error: ${error.statusCode}`" /> 
    <pre style="font-size: 10px; line-height: 1;" v-html="JSON.stringify(error)"></pre>
  </NuxtLayout>
</template>
