<script setup>

const props = defineProps({
  sections: { type: Array, required: false },
});

// Sections
const chooseSection = (section) => {
  if (section._type === 'gallery') return resolveComponent('ModuleGallery')
  //   if (section._type === 'video') return resolveComponent('Video')
  if (section._type === 'textType') return resolveComponent('ModulePortableText')
  //   if (section._type === 'imageBlock') return resolveComponent('Image')
}

</script>
<template>
  <div>
    <component 
    class="builder-block" 
    v-for="section in props.sections" 
    :key="section._key" 
    :is="chooseSection(section)"
    :data="section" />
  </div>
</template>
<style scoped>
</style>