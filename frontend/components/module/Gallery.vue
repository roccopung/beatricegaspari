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
        class: isBodyOverflowHidden.value ? 'overflow-hidden' : ''
    }
}));

// onMounted(() => {
//     if (props.data) {
//         swiper.value = new Swiper(swiperEl.value, {
//             loop: false,
//             slidesPerView: 'auto',
//             spaceBetween: 5,
//             centeredSlides: false,
//             keyboard: {
//                 enabled: true,
//             }
//         });
//     }
// });

onUnmounted(() => {
    swiper.value?.destroy?.();
    isBodyOverflowHidden.value = false;
});
</script>

<template>
    <div v-if="props.data?.images" class="gallery-container">
        <div class="gallery-wrapper flex flex-row gap-1 flex-wrap">
            <div class="gallery-slide h-32 w-fit object-contain" v-for="(image, i) in props.data?.images" :key="i"
                @click="openGallery(i)" role="button" tabindex="0">
                <Image class="h-32" :src="$urlFor(image.asset).quality(85).format('avif').url()" layout="constrained"
                    :width="getImageDimensions(image.asset).width" :height="getImageDimensions(image.asset).height"
                    alt="Project Image" />
            </div>
        </div>
        <div v-if="props.data?.caption" class="text-black opacity-35 pt-2">{{ props.data.caption }}</div>
    </div>

    <div v-if="isOpen" ref="modalEl" class="modal bg-gray-200 backdrop-blur-[2px] bg-opacity-85">
        <div role="button" class="icon-close-container p-1 bg-white" @click="closeGallery" @keydown.enter="closeGallery"
            tabindex="0" aria-label="Close" v-html="'CLOSE'">
        </div>
        <SwiperModal @image-clicked="closeGallery()" :images="props.data?.images" :initial-slide="initialSlide" />
    </div>
</template>

<style scoped>
.gallery-slide {
    @apply bg-white
}

.gallery-slide,
.gallery-slide img {
    object-fit: contain !important;
    height: 120px;
    width: 120px;
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