<script setup>
const route = useRoute();
</script>

<template>
	<footer v-show="route.fullPath == '/' || route.fullPath.includes('category')" class="typo--s relative font-body footer w-full h-full flex justify-end pb-2 pr-2 md:pb-4 md:pr-4">
		<div>© 2024 Website by <a class="bg-gray-200" target="_blank" href="https://roccopunghellini.com">Rocco Punghellini</a></div>
	</footer>
</template>

<style scoped>
.footer {
	height: 100%;
}
</style>
