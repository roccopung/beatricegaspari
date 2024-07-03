<script setup>
import { provide } from 'vue'
import { queryNavigation } from '~/queries/navigation';

const { response } = await queryNavigation();
const navigation = ref(null);

navigation.value = response.value;
provide('navigation', navigation);

</script>

<template>
	<main class="typo--m ">
		<UiHeader />
		<div>
			<slot />
		</div>
		<UiFooter />
	</main>
</template>

<style scoped>
main {
	display: grid;
	grid-template-rows: auto 1fr auto;
}
</style>
