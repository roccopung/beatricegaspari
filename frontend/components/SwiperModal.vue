<script setup>
import { register } from 'swiper/element/bundle';
import { Image } from "@unpic/vue";
import { getImageDimensions } from '@sanity/asset-utils'
import { Pagination } from 'swiper/modules';

onMounted(async () => {
  register();

  await nextTick();

  if (swiperRef.value) {
    const swiperParams = {
      modules: [Pagination],
      slidesPerView: 1,
      speed: 1,
      pagination: {
        type: 'fraction',
      },
      keyboard: {
        enabled: true,
      },
      lazy: true,
    };

    Object.assign(swiperRef.value, swiperParams);
    swiperRef.value.initialize();
  }
});

const props = defineProps({
  images: Array,
  initialSlide: Number
});

const swiperRef = ref(null);

const updateSwiper = () => {
  if (swiperRef.value) {
    swiperRef.value.swiper.update();
  }
};
</script>

<template>
  <swiper-container :initial-slide="initialSlide" :slides-per-view="1" lazy="true" ref="swiperRef">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <Image class="object-contain w-full h-full" 
        :src="$urlFor(image.asset).quality(85).format('webp').url()" layout="constrained"
        :width="getImageDimensions(image.asset).width" :height="getImageDimensions(image.asset).height"
        alt="Project Image" @load="updateSwiper" @click="$emit('imageClicked')" />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

swiper-slide img {
  height: 88svh;
  object-fit: contain !important;
}
</style>