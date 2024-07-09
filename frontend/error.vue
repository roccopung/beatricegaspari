<script setup>
const props = defineProps({
  error: {
    type: object
  },
})

const route = useRoute();

const goBack = () => {
  const router = useRouter();
  router.push('/');
}

</script>

<template>
  <div class="container typo--m">
    <h2>{{ props.error.statusCode }}</h2>
    <div>page not found: {{ route.fullPath }}</div>
    <button @click="goBack">Go back to site</button>
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
  background-color: var(--color-grey-100);
}
</style>