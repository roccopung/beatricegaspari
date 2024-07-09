<script setup>
import { inject } from 'vue';
import { PortableText } from '@portabletext/vue';

const navigation = inject('navigation');
const navigationEl = ref(null);

const route = useRoute();

const { width } = useWindowSize();

const aboutDescription = computed(() => navigation.value?.about?.aboutDescription || [])

const dropdownPortfolio = ref(false)
const dropdownAbout = ref(false)
const dropdownContact = ref(false)
const dropdownRef = ref(null)

onClickOutside(
    dropdownRef,
    (event) => {
        if (dropdownPortfolio.value) {
            dropdownPortfolio.value = false;
        }
        if (dropdownAbout.value) {
            dropdownAbout.value = false;
        }
        if (dropdownContact.value) {
            dropdownContact.value = false;
        }
    },
)

const toggleDropdownPortfolio = () => {
    dropdownAbout.value = false
    dropdownContact.value = false
    dropdownPortfolio.value = !dropdownPortfolio.value
}

const toggleDropdownAbout = () => {
    dropdownPortfolio.value = false
    dropdownContact.value = false
    dropdownAbout.value = !dropdownAbout.value
}

const toggleDropdownContact = () => {
    dropdownPortfolio.value = false
    dropdownAbout.value = false
    dropdownContact.value = !dropdownContact.value
}


const disabled = ref(false);
const { style } = useDraggable(navigationEl, {
    initialValue: { x: '', y: '' },
    preventDefault: true,
    disabled,
})

watchEffect(() => {
    disabled.value = width.value < 720;
});

onBeforeRouteUpdate(
    () => {
        dropdownPortfolio.value = false
        dropdownAbout.value = false
        dropdownContact.value = false
    }
)
</script>
<template>
    <div :style="style" ref="dropdownRef" class="fixed w-full md:w-2/3 px-2 top-8 md:top-[1.75rem] md:right-4 md:px-0">
        <nav ref="navigationEl" class="bg-gray-200 backdrop-blur-sm bg-opacity-35 cursor-grab">
            <ul class="w-full flex flex-row justify-between items-center h-full">
                <button class="p-1 hover:bg-yellow-accent active:bg-yellow-accent"
                    :class="dropdownPortfolio ? 'bg-yellow-accent' : ''" @click="toggleDropdownPortfolio"
                    v-html="'Portfolio'" />
                <!-- <button class="p-1 hover:bg-yellow-accent active:bg-yellow-accent"><a href="#" target="_blank"
                        rel="noopener noreferrer">Shop</a></button> -->
                <button class="p-1 hover:bg-yellow-accent active:bg-yellow-accent"
                    :class="dropdownAbout ? 'bg-yellow-accent' : ''" @click="toggleDropdownAbout" v-html="'About'" />
                <button class="p-1 hover:bg-yellow-accent active:bg-yellow-accent"
                    :class="dropdownContact ? 'bg-yellow-accent' : ''" @click="toggleDropdownContact"
                    v-html="'Contact'" />
            </ul>
        </nav>

        <ul v-if="dropdownPortfolio">
            <NuxtLink class="p-1 w-fit h-fit block bg-gray-200 backdrop-blur-sm bg-opacity-35 cursor-pointer
                hover:bg-yellow-accent active:bg-yellow-accent" v-html="'All' + `(${navigation.all})`" to="/" />
            <div v-for="category in navigation.categories">
                <NuxtLink class="p-1 w-fit h-fit block bg-gray-200 backdrop-blur-sm bg-opacity-35 cursor-pointer
                hover:bg-yellow-accent active:bg-yellow-accent" v-if="category.count > 0" :key="category.id"
                    v-html="category.title + `(${category.count})`" :to="`/category/${category.slug}`" />
            </div>
        </ul>

        <div class="about_description-container bg-orange-200 w-full min-h-fit md:max-h-80 typo--l p-1 pb-3 overflow-y-scroll overflow-x-hidden"
            v-if="dropdownAbout">
            <PortableText :value="aboutDescription" />
        </div>
        
        <div class="contact-container bg-orange-200 w-full h-fit typo--l p-1 pb-3 overflow-y-scroll overflow-x-hidden"
            v-if="dropdownContact">
            <ul>
                <li class="contacts lowercase" v-for="contact in navigation.about.contacts">
                    <a class="flex gap-x-6 items-baseline" v-if="contact.value.includes('@')"
                        :href="`mailto:${contact.value}`" target="_blank">{{ contact.label }}
                        <span class="typo--m" v-html="contact.type" /></a>

                    <a class="flex gap-x-6 items-baseline" v-else :href="contact.value" target="_blank">{{ contact.label
                        }}
                        <span class="typo--m" v-html="contact.type" /></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.about_description-container::-webkit-scrollbar,
.contact-container::-webkit-scrollbar {
    width: 5px;
    background: var(--color-grey-200);
}

.about_description-container::-webkit-scrollbar-thumb,
.contact-container::-webkit-scrollbar-thumb {
    -webkit-border-radius: 0px;
    border-radius: 0px;
    background: var(--color-black);
}

.contacts {
    transition: 0.3s;

    &:hover {
        opacity: 0.5;
    }
}
</style>