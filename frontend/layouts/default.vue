<script setup>
import { provide } from 'vue'
import { queryNavigation } from '~/queries/navigation';

const { response } = await queryNavigation();
const navigation = ref(null);

navigation.value = response.value;
provide('navigation', navigation);

useSeoMeta({
	title: 'Beatrice Gaspari',
	description: 'Digital Portfolio of the Italian illustrator Beatrice Gaspari',
	ogImage: '~/images/favicon.png',
})

</script>

<template>
	<main class="relative typo--m font-body">
		<RouterView>
			<UiHeader />
		</RouterView>
		<div class="content-container">
			<slot />
		</div>
		<UiFooter />
	</main>
</template>

<style scoped>
.content-container {
	min-height: calc(100svh - 2rem);
	height: 100%;
}
</style>
