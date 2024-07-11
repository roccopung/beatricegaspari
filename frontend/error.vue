<script setup>
const props = defineProps({
  error: Object,
})

const route = useRoute();

const goBack = () => {
  const router = useRouter();
  router.push('/');
}

</script>

<template>
  <div class="container typo--m text-center">
    <h2 class="text-[red]">{{ error.statusCode }}</h2>
    <div>You have a critical error at</div>
    <div class="max-w-96">{{ route.fullPath }}</div>
    <button class="bg-gray-200 px-1" @click="goBack">Go back to site</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
 @apply bg-gray-100;
}
</style>