<script setup lang="ts">
withDefaults(defineProps<{
  title?: string,
}>(), {
  title: 'Beatrice Gaspari',
})
</script>

<template>
  <div class="h-full w-full flex items-start justify-start bg-gray-100">
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full">
        <h1 class="p-20 font-black text-left">
          {{ title }}
        </h1>
        <h2 class="p-20 font-black text-left"></h2>
        <p class="pb-10 px-20 font-bold mb-0">
          beatricegaspari.com
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
