<script setup>
import { Image } from "@unpic/vue";

const props = defineProps({
    projects: {
        type: Array,
    }
});

const hoveredProjectId = ref(null);
</script>
<template>
    <div class="grid-container w-full p-2 pt-32 md:p-4 md:pt-32">
        <div class="projects-grid grid gap-1 grid-cols-2 md:grid-cols-4">
            <NuxtLink v-for="project in projects" :key="project._id" @mouseover="hoveredProjectId = project._id"
                @mouseleave="hoveredProjectId = null" class="grid-item h-fit hover:rotate-2 transition" :to="`/project/${project.slug}`">
                <Image 
                class="project-image" :class="{ 'mix-blend-multiply': hoveredProjectId === project._id }"
                :src="$urlFor(project.cover).quality(50).format('avif').url()" layout="constrained"
                :width="project.coverWidth" :height="project.coverHeight" :alt="project.title" />
                <div class="md:flex flex-row items-baseline justify-between py-1 gap-2 w-full">
                    <h2 class="typo--m project-title">{{ project.title }}</h2>
                    <span class="typo--m-alt lowercase technique">{{ project.technique }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped>
.technique, .project-title {
    max-width: 50%;
}
</style>