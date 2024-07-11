<script setup>
import { queryProject } from '~/queries/project';

definePageMeta({
    key: route => route.fullPath
})

const route = useRoute();
const slug = route.params.slug;

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
const prevData = response.value.prev;
const nextData = response.value.next;
// console.log(response)

</script>
<template>
    <div class="pb-10 flex flex-col gap-2">
        <div class="top">
            <div v-if="galleryImages" class="w-screen h-[60svh] mt-28">
                <Swiper :inline="true" :data="galleryImages" />
            </div>
            <div v-if="details" class="w-full flex justify-center typo--s">
                <div class="md:flex flex-row mt-10 [&>*]:px-1 dark:[&>*]:px-0 dark:gap-5">
                    <div v-if="details.title" class="bg-orange-200 dark:bg-opacity-0 " v-html="details.title" />
                    <div v-if="details.client" class="bg-green-100 dark:bg-gray-100" v-html="details.client" />
                    <div v-if="details.category && details.category.length" class="bg-yellow-100 dark:bg-gray-100"
                        v-for="category in details.category" v-html="category.title" />
                    <div v-if="details.year" class="bg-gray-200 dark:bg-gray-100" v-html="details.year" />
                    <div v-if="details.technique" class="bg-white dark:bg-gray-100" v-html="details.technique" />
                </div>
            </div>
        </div>
        <div v-if="description" class="content pt-5 px-2 md:p-4">
            <ModulePortableText :data="description" />
        </div>
        <div v-if="pageBuilder" class="page-builder p-2 md:p-4">
            <PageBuilder :sections="pageBuilder" />
        </div>
        <div>
            <PrevNext :prevData="prevData" :nextData="nextData" />
        </div>
    </div>
</template>
<style scoped></style>