<script setup>
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Image } from "@unpic/vue";
import 'swiper/swiper-bundle.css';

const { width } = useWindowSize()
const windowWidth = width;

const swiper = ref();
const swiperEl = ref();
const nextEl = ref();
const prevEl = ref();
const paginationEl = ref();

const props = defineProps({
    data: {
        type: Array,
    },
    inline: {
        type: Boolean,
        default: false,
    }
});


onMounted(() => {
    if (props.data) {
        swiper.value = new Swiper(swiperEl.value, {
            modules: [Navigation, Pagination],
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 5,
            centeredSlides: true,
            freeMode: true,
            pagination: {
                el: paginationEl.value,
                type: "fraction",
            },
            keyboard: {
                enabled: true,
            }
        });
    }

});

onUnmounted(() => {
    swiper.value?.destroy?.();
});
</script>
<template>
    <div v-if=(props.data) ref="swiperEl" class="swiper">
        <div v-if=(props.data) class="swiper-wrapper" :class="inline ? 'inline' : 'stacked'">
            <div class="swiper-slide h-full w-auto" v-for="(image, i) in props.data">
                <Image :src="$urlFor(image.url).quality(85).format('webp').url()" :key="i" layout="constrained"
                    :width="image.width" :height="image.height" alt="Project Image" />
            </div>
        </div>
        <div v-else class="swiper-slide"></div>
    </div>
    <div v-if="props.data" ref="paginationEl" class="swiper-pagination typo--s"></div>
</template>
<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-wrapper {
    display: flex;
    justify-content: left;
}

/* .stacked {
    flex-wrap: wrap;
} */

.inline {
    flex-wrap: nowrap;
}

.swiper-slide,
.swiper-slide-active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
}

.swiper-slide img {
    height: 100%;
    object-fit: contain !important;
}

.swiper-btn-next,
.swiper-btn-prev {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    cursor: pointer;
    width: 50%;
    height: 100%;
    display: block;
    opacity: 0;
}

.swiper-btn-prev {
    left: 0;
    cursor: w-resize;
}

.swiper-btn-next {
    right: 0;
    cursor: e-resize;
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
</style>