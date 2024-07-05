<script setup>
import { queryProjectsByCategory } from '~/queries/projectsByCategory';

const { params } = useRoute();
const projectCategory = params.slug;
const { response } = await queryProjectsByCategory(projectCategory);

</script>
<template>
     <Grid :projects="response" />
</template>
<style></style>