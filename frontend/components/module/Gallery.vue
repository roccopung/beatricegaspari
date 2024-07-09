<script setup>
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Image } from "@unpic/vue";
import 'swiper/swiper-bundle.css';
import { getImageDimensions} from '@sanity/asset-utils'

const { width } = useWindowSize()
const windowWidth = width;

const swiper = ref();
const swiperEl = ref();
const nextEl = ref();
const prevEl = ref();
const paginationEl = ref();
const imageFocused = ref(false);

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
            centeredSlides: false,
            // freeMode: true,
            pagination: {
                el: paginationEl.value,
                type: "fraction",
            },
            keyboard: {
                enabled: true,
            }
        });
    }
    console.log(props.data);
});

onUnmounted(() => {
    swiper.value?.destroy?.();
});
</script>
<template>
    <div ref="swiperEl" class="swiper">
        <div v-if=(props.data?.images) class="swiper-wrapper">
            <div class="swiper-slide h-full w-auto" v-for="(image, i) in props.data?.images">
                <Image :src="$urlFor(image.asset).quality(85).format('webp').url()" :key="i" layout="constrained"
                :width="getImageDimensions(image.asset).width" 
                :height="getImageDimensions(image.asset).height" 
                alt="Project Image" />
            </div>
        </div>
        <div v-else class="swiper-slide"></div>
    </div>
    <div ref="paginationEl" class="swiper-pagination typo--s"></div>
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

/* .stacked {
    flex-wrap: wrap;
} */

/* .inline {
    flex-wrap: nowrap;
} */

.swiper-slide,
.swiper-slide-active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
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
</style>