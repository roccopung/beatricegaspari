<script setup>
const navigationKey = ref(0);
const router = useRoute();
const { width } = useWindowSize();

const forceRerender = () => {
	navigationKey.value += 1;
};

watch(width, (oldVal, newVal) => {
	if (oldVal !== newVal) {
		forceRerender();
	}
});

onBeforeRouteUpdate((to, from) => {
	forceRerender();
});


</script>

<template>
	<div class="fixed z-10 w-full flex flex-column flex-wrap items-center justify-center pt-0 px-2
	md:flex-row md:justify-between md:pt-7 md:px-4">
		<UiLogo />
		<UiNavigation :key="navigationKey" />
	</div>
</template>

<style lang="postcss"></style>
