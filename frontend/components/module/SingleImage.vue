<script setup>
import { Image } from "@unpic/vue";
import { getImageDimensions } from '@sanity/asset-utils'

const props = defineProps({
    data: { Type: Object || Array }
});
</script>
<template>
    <div class="block-container">
        <div class="image-container">
            <Image class="image" :src="$urlFor(props.data.asset).quality(85).format('avif').url()" layout="constrained"
                :width="getImageDimensions(props.data.asset).width"
                :height="getImageDimensions(props.data.asset).height" alt="Project Image" />
            <figcaption v-if="props.data.caption" v-html="props.data.caption"></figcaption>
        </div>
    </div>
</template>
<style scoped>
.block-container {
    width: 100%;
    display: flex;
    justify-content: left;
}

.image-container {
    max-width: 100%;

    @media(--m) {
        max-width: 520px;
    }

    @media(--xl) {
        width: 100%;
        max-width: 40svw;
    }
}

.image {
    padding-bottom: var(--space-xs);
}

img {
    width: 100%;
}

figcaption {
    opacity: 0.4;
}
</style>