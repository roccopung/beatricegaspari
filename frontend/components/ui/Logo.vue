<script setup></script>
<template>
    <div class="logo bg-gray-200 h-fit w-[180px] backdrop-blur-sm bg-opacity-35 ">
        <NuxtLink to="/">
            <IconLogo />
        </NuxtLink>
    </div>
</template>
<style scoped>
@media (prefers-color-scheme: dark) {
  .logo {
    &:hover, &:active, &:focus {
        background-color: var(--darkMode-color-white);
    }
  }
}
</style>