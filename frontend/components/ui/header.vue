<script setup>
const navigationKey = ref(0);
const { width } = useWindowSize();

const forceRerender = () => {
	navigationKey.value += 1;
};

watch(width, (oldVal, newVal) => {
	if (oldVal !== newVal) {
		forceRerender();
	}
});
</script>

<template>
	<div class="w-full flex flex-column flex-wrap items-center justify-center pt-0 px-2
	md:flex-row md:justify-between md:pt-7 md:px-4">
		<UiLogo />
		<UiNavigation :key="navigationKey" />
	</div>
</template>

<style lang="postcss"></style>
