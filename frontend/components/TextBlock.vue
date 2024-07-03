<script setup>
import { PortableText } from '@portabletext/vue';

const props = defineProps({
    section,
});

// const components = computed(() => ({
//     block: {
//         p: (_, { slots }) => h('p', { class: 'typo--m' }, slots.default?.()),
//         h2: (_, { slots }) => h('h2', { class: 'h2 typo--m' }, slots.default?.()),
//         h3: (_, { slots }) => h('h2', { class: 'h2 typo--l' }, slots.default?.()),
//     },
//     list: {
//         number: (_, { slots }) => h('ol', { class: 'listItem' }, slots.default?.()),
//   }
// }));

</script>
<template>
    <div class="text_block-container">
        <div class="text_block">
            <div v-if="props.section.title" class="text-top project-spec typo--l" v-html="props.section.title"></div>
            <!-- <PortableText :value="props.section.TextBlock" :components="components" /> -->
        </div>
    </div>
</template>
<style scoped>
</style>