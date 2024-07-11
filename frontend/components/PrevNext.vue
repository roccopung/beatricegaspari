<script setup>

const router = useRouter();

const props = defineProps({
	nextData: { type: Object || Array, required: false },
	prevData: { type: Object || Array, required: false },
});


const goToNextPage = () => {
	if (props.nextData) {
		router.push({ params: { slug: props.nextData.slug } });
	}
};

const goToPrevPage = () => {
	if (props.prevData) {
		router.push({ params: { slug: props.prevData.slug } });
	}
};

</script>

<template>
	<div>
		<div class="footer typo--m">
			<div v-if="router.currentRoute.value.name !== 'index'" class="swipe-projects">
				<button :class="{ invisible: !props.prevData || props.prevData.directUrl }"
					class="button-prev bg-gray-200 dark:bg-gray-100 hover:bg-yellow-100 dark:hover:bg-white active:hover:bg-white" type="submit"
					@click="goToPrevPage" v-html="props.prevData?.title" />
				<button :class="{ invisible: !props.nextData || props.nextData.directUrl }"
					class="button-next bg-gray-200 dark:bg-gray-100 hover:bg-yellow-100 dark:hover:bg-white dark:active:bg-white" type="submit"
					@click="goToNextPage" v-html="props.nextData?.title" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.swipe-projects {
	position: fixed;
	bottom: 0;
	display: grid;
	width: 100%;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
}

.button-next {
	width: 1fr;
	@apply p-2;
	text-align: right;
}

.invisible {
	visibility: hidden;
}

.button-prev {
	width: 1fr;
	@apply p-2;
	text-align: left;
}


.navigation {
	background-color: var(--color-white);
	display: flex;
	/* gap: var(--space-s); */
}

.navigation>* {
	&:hover {
		@apply bg-gray-100;
	}
}
</style>
