<script setup>
import { provide } from 'vue'
import { queryNavigation } from '~/queries/navigation';

const { response } = await queryNavigation();
const navigation = ref(null);

navigation.value = response.value;
provide('navigation', navigation);

</script>

<template>
	<main class="relative typo--m font-body">
		<UiHeader />
		<div class="content-container p-2 md:p-4">
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
