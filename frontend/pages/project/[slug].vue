<script setup>
import { queryProject } from '~/queries/project';

const { params } = useRoute();
const slug = params.slug;

const { response } = await queryProject(slug);

const galleryImages = response.value.gallery?.images || null;
const details = {
    title: response.value.title,
    client: response.value.client,
    technique: response.value.technique,
    year: response.value.year,
    category: response.value.category,
}
const description = response.value.description;
const pageBuilder = response.value.pageBuilder;
// console.log(pageBuilder[0].images);

</script>
<template>
    <div class="top">
        <div v-if="galleryImages" class="w-screen h-[60svh] mt-28">
            <Swiper :inline="true" :data="galleryImages" />
        </div>
        <div v-if="details" class="w-full flex justify-center typo--s">
            <div class="md:flex flex-row mt-10 [&>*]:px-1">
                <div v-if="details.title" class="bg-orange-200" v-html="details.title" />
                <div v-if="details.client" class="bg-green-100" v-html="details.client" />
                <div v-if="details.category && details.category.length" class="bg-yellow-accent" v-for="category in details.category" v-html="category.title" />
                <div v-if="details.year" class="bg-gray-200" v-html="details.year" />
                <div v-if="details.technique" class="bg-white" v-html="details.technique" />
            </div>
        </div>
        <div v-if="description" class="content pt-5">
            <ModulePortableText :data="description" />
        </div>
    </div>
    <div v-if="pageBuilder" class="page-builder">
        <PageBuilder :sections="pageBuilder" />
    </div>
</template>
<style scoped>
</style>