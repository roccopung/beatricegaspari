<script setup>
import { Image } from "@unpic/vue";
import { getImageDimensions } from '@sanity/asset-utils'


const props = defineProps({
    projects: {
        type: Array,
    }
});

// const isHovered = ref([false]);

// const toggleHover = (index) => {
//     isHovered[index] = !isHovered[index];
// };

const hoveredProjectId = ref(null);

</script>
<template>
    <div class="grid-container w-full p-4 pt-32">
        <div class="grid gap-1 grid-cols-3">
            <NuxtLink v-for="project in projects" :key="project._id" @mouseover="hoveredProjectId = project._id"
                @mouseleave="hoveredProjectId = null" class="grid-item w-fit h-fit hover:rotate-1 transition" :to="`/project/${project.slug}`">
                <Image class="project-image" :class="{ 'mix-blend-multiply': hoveredProjectId === project._id }"
                    :src="$urlFor(project.cover).quality(50).format('avif').url()" layout="constrained"
                    :width="project.coverWidth" :height="project.coverHeight" alt="A lovely bath" />
                <div class="flex flex-row items-baseline justify-between py-1">
                    <h2 class="typo--m">{{ project.title }}</h2>
                    <span class="typo--m-alt lowercase">{{ project.technique }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped>
.grid-item {
    &:hover {
        background-color: var(--color-yellow-dark);
        transform: rotate(90);
    }
}

</style>