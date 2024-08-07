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
        <div class="projects-grid grid gap-x-1 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <NuxtLink v-for="project in projects" :key="project._id" @mouseover="hoveredProjectId = project._id"
                @mouseleave="hoveredProjectId = null" class="grid-item h-fit hover:rotate-2 transition" :to="`/project/${project.slug}`">
                <Image 
                class="project-image" :class="{ 'mix-blend-multiply': hoveredProjectId === project._id }"
                :src="$urlFor(project.cover).quality(50).format('avif').url()" layout="constrained"
                :width="project.coverWidth" :height="project.coverHeight" :alt="project.title" />
                <div class="lg:flex flex-row flex-wrap items-baseline justify-between py-2 w-full">
                    <h2 class="typo--m project-title w-auto">{{ project.title }}</h2>
                    <span class="typo--s lowercase technique w-auto pt-1">{{ project.technique }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped>
.technique{
    /* padding-left: 50%; */
    opacity: 0.3;
}
</style>