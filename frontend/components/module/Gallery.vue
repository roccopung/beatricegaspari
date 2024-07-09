<script setup>
import Swiper from 'swiper';
import { Image } from "@unpic/vue";
import 'swiper/swiper-bundle.css';
import { getImageDimensions } from '@sanity/asset-utils'

const { width } = useWindowSize()
const windowWidth = width;

const swiper = ref();
const swiperEl = ref();

const modalEl = ref(null)

const isBodyOverflowHidden = ref(false);
const isOpen = ref(false);
const initialSlide = ref(0);

const props = defineProps({
    data: {
        type: Object,
    }
});

function closeGallery() {
    isOpen.value = false;
    isBodyOverflowHidden.value = false;
}

function openGallery(index) {
    initialSlide.value = index;
    isOpen.value = true;
    isBodyOverflowHidden.value = true;
}

useHead(() => ({
  bodyAttrs: {
    class: isBodyOverflowHidden.value ? 'overflow-hidden' : 'overflow-y-auto'
  }
}));

onMounted(() => {
    if (props.data) {
        swiper.value = new Swiper(swiperEl.value, {
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 5,
            centeredSlides: false,
            keyboard: {
                enabled: true,
            }
        });
    }
});

onUnmounted(() => {
    swiper.value?.destroy?.();
    isBodyOverflowHidden.value = false;
});
</script>

<template>
    <div class="gallery-container">
        <div ref="swiperEl" class="swiper">
            <div v-if="props.data?.images" class="swiper-wrapper">
                <div class="swiper-slide h-full w-auto" 
                     v-for="(image, i) in props.data?.images" 
                     :key="i"
                     @click="openGallery(i)"
                     role="button"
                     tabindex="0">
                    <Image :src="$urlFor(image.asset).quality(85).format('webp').url()" 
                           layout="constrained"
                           :width="getImageDimensions(image.asset).width" 
                           :height="getImageDimensions(image.asset).height" 
                           alt="Project Image" />
                </div>
            </div>
            <div v-else class="swiper-slide"></div>
        </div>
        <div v-if="props.data?.caption" class="text-black opacity-35">{{ props.data.caption }}</div>
    </div>

    <div v-if="isOpen" ref="modalEl" class="modal bg-gray-200 backdrop-blur-[2px] bg-opacity-85">
        <div
            role="button"
            class="icon-close-container p-1 bg-white"
            @click="closeGallery"
            @keydown.enter="closeGallery"
            tabindex="0"
            aria-label="Close"
            v-html="'CLOSE'"
        >
        </div>
        <SwiperModal @image-clicked="closeGallery()" :images="props.data?.images" :initial-slide="initialSlide" />
    </div>
</template>

<style scoped>
.swiper {
    width: 100%;
    height: auto;
}

.swiper-wrapper {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    row-gap: 5px;
}

.swiper-slide,
.swiper-slide-active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    cursor: pointer;
}

.swiper-slide img {
    height: 120px;
    object-fit: contain !important;
}

.swiper-btn-next.swiper-button-disabled,
.swiper-btn-prev.swiper-button-disabled {
    opacity: 0;
}

.swiper-pagination {
    width: 100%;
}

.swiper-pagination-fraction {
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    margin-top: var(--space-100);
    width: 100%;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.icon-close-container {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 1001;
}
</style>