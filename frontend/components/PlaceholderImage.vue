<script setup></script>
<template>
    <div class="placeholder">
        <div class="gradient element1"></div>
    </div>
</template>
<style scoped>
.placeholder {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    background-color: var(--color-gray-200);
}
.element1 {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.gradient {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f6f6;
    background: linear-gradient(to right, var(--color-grey-100) 10%, #f6f6f6 30%, var(--color-grey-100) 80%);
    background-size: 1000px 640px;

    position: relative;
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}
</style>
