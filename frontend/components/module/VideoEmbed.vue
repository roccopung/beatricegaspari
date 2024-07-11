<script setup>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
const playerEl = ref();
const props = defineProps({
    data: { type: Object || Array, required: false },
});

onMounted(() => {
    const player = new Plyr(playerEl.value, {
        debug: false,
        volume: 0,
        autoplay: false,
        muted: true,
        fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: true,
            container: null,
        },
    });
    window.player = player.value;

    player.on("enterfullscreen", event => {
        screen.orientation.lock("landscape");
    });

    player.on("exitfullscreen", event => {
        screen.orientation.lock("portrait");
    });

})
</script>
<template>
    <div class="video-embedded-container">
        <div class="video-embedded-wrapper plyr__video-embed" ref="playerEl">
            <iframe class="video-embedded" :src="props.data?.url"></iframe>
        </div>
        <div class="video-embedded-label text-black opacity-35 pt-2">{{ props.data?.videoLabel }}</div>
    </div>
</template>
<style>
.video-embedded-container {
    width: 100%;
    background-color: transparent;
    position: relative;
    max-width: 800px;
    overflow: hidden;
    @media(--l){
        max-width: none;
        width: 60%;
    }
}

.video-embedded {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.plyr {
    --plyr-color-main: var(--color-acid-green);
    --plyr-video-control-color: var(--color-primary-light);
    --plyr-video-controls-background: transparent;

    @media(--m) {
        padding: var(--space-xs);
        border-radius: var(--space-xs);
    }
}

.plyr.plyr--stopped .plyr__controls { opacity: 0 !important; }

</style>