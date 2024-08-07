<script setup>
import { queryProjectsList } from '~/queries/projectsList';
import { querySettings } from '~/queries/settings';

const { response } = await queryProjectsList();
const {settings} = await querySettings();

// const siteTitle = settings.value.siteTitle;
// const description = settings.value.excerpt;

// useSeoMeta({
//   title: siteTitle,
//   ogTitle: siteTitle,
//   description: description,
//   ogDescription: description,
//   ogImage: '~/images/favicon-temp.png',
// })

</script>
<template>
	<Grid :projects="response" />
</template>

<style scoped></style>
