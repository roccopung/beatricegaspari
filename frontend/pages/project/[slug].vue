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
                <div class="details md:flex flex-row mt-10 [&>*]:px-1">
                    <div v-if="details.title" class="detail detail-title " v-html="details.title" />
                    <div v-if="details.client" class="detail detail-client " v-html="details.client" />
                    <div v-if="details.category && details.category.length" class="detail detail-category "
                        v-for="category in details.category" v-html="category.title" />
                    <div v-if="details.year" class="detail detail-year" v-html="details.year" />
                    <div v-if="details.technique" class="detail detail-technique " v-html="details.technique" />
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
<style scoped>

/* .detail {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
*/
.detail-title {
    background-color: var(--color-orange-200);
}

.detail-client {
    background-color: var(--color-green-100);
}

.detail-category {
    background-color: var(--color-yellow-100);
}

.detail-year {
    background-color: var(--color-gray-200);
}

.detail-technique {
    background-color: var(--color-white);
}


/* @media (prefers-color-scheme: dark) {

    .detail-title,
    .detail-client,
    .detail-category,
    .detail-year,
    .detail-technique {
        background-color: var(--darkMode-color-grey-200);
    }x
}  */
</style>