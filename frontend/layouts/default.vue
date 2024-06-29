<script setup></script>

<template>
	<main class="typo--m">
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
