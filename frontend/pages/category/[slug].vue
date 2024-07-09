<script setup>
import { queryProjectsByCategory } from '~/queries/projectsByCategory';

const route = useRoute();
const projectCategory = route.params.slug;
const { response } = await queryProjectsByCategory(projectCategory);

</script>
<template>
     <Grid :projects="response" />
</template>
<style></style>