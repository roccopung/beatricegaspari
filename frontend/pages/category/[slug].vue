<script setup>
import { queryProjectsByCategory } from '~/queries/projectsByCategory';

const route = useRoute();
const projectCategory = route.params.slug;
const { response } = await queryProjectsByCategory(projectCategory);

useSeoMeta({
  title: `BG | ${projectCategory}`,
})

</script>
<template>
     <Grid :projects="response" />
</template>
<style></style>