<script setup>

const props = defineProps({
  sections: { type: Array || Object, required: false },
});

// Sections
const chooseSection = (section) => {
  if (section._type === 'gallery') return resolveComponent('ModuleGallery')
  if (section._type === 'video') return resolveComponent('ModuleVideoEmbed')
  if (section._type === 'textBlock') return resolveComponent('ModulePortableText')
    if (section._type === 'image') return resolveComponent('ModuleSingleImage')
}

console.log(props.sections)
</script>
<template>
  <div class="flex flex-col gap-6 pt-6" v-if="props.sections">
    <component v-for="section in props.sections" :key="section._key" :is="chooseSection(section)" :data="section" />
  </div>
  <div v-else />
</template>
<style scoped></style>