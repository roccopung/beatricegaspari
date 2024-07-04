<script setup>
import { queryProjectsList } from '~/queries/projectsList';
const { response } = await queryProjectsList();

</script>
<template>
	<Grid :projects="response" />
</template>

<style scoped></style>
