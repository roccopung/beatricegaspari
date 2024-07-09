<script setup>
import { PortableText } from '@portabletext/vue';

const props = defineProps({
    data: {
        type: Array,
    },
});

const components = {
  block: {
    normal: (_, { slots }) => h('p', { class: 'typo--xl' }, slots.default?.()),
  },
};

</script>
<template>
    <div class="portable_text-container">
        <PortableText :value="props.data" :components="components" />
    </div>
</template>
<style scoped></style>