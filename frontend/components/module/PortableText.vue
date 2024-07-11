<script setup>
import { PortableText } from '@portabletext/vue';
import { getImageDimensions } from '@sanity/asset-utils';
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Array || Object,
  },
});

const enlargedImageId = ref(null);
const lightboxOpen = ref(false);

const ImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);

  const imageId = value._key || `img-${Math.random().toString(36)}`;

  const toggleSize = () => {
    if (enlargedImageId.value === imageId) {
      enlargedImageId.value = null;
    } else {
      enlargedImageId.value = imageId;
      lightboxOpen.value = true;
    }
  };

  const closeEnlarged = (event) => {
    if (event.target === event.currentTarget) {
      enlargedImageId.value = null
      lightboxOpen.value = false;
    }
  }

  return h('div', { class: 'image-container' }, [
    h('img', {
      src: urlFor(value.asset)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url(),
      alt: value.alt || 'image',
      loading: 'lazy',
      style: {
        aspectRatio: width / height,
        cursor: 'pointer',
      },
      class: [
        'inline-image',
        { 'enlarged': enlargedImageId.value === imageId }
      ],
      onClick: toggleSize,
    }),
    enlargedImageId.value === imageId && h('div', {
      class: 'lightbox',
      onClick: closeEnlarged,
    }, [
      h('img', {
        src: urlFor(value.asset).width(1200).fit('max').auto('format').url(),
        alt: value.alt || 'enlarged image',
        class: 'lightbox-image',
      })
    ])
  ])
}

const components = {
  block: {
    normal: (_, { slots }) => h('p', { class: 'typo--xl' }, slots.default?.()),
    h2: (_, { slots }) => h('h2', { class: 'typo--l' }, slots.default?.()),
  },
  marks: {
    link: ({ value }, { slots }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return h(
        'a',
        {
          href: value?.href,
          target,
          rel: target === '_blank' ? 'noindex nofollow' : undefined,
          class: 'external-link',
        },
        slots.default?.(),
      );
    },
    internalLink: ({ value }, { slots }) => {
      const url = `/project/${value.slug.current}`
      return h('nuxtlink', { href: url, class: 'internal-link' }, slots.default?.())
    }
  },
  types: {
    image: ImageComponent,
    textBlock: (props) => h('div', { class: 'text-block' }, [
      h('h3', { class: 'typo--xl opacity-35' }, props.value.title),
      h(PortableText, {
        value: props.value.TextBlock,
        components: {
          types: {
            image: ImageComponent,
          },
          block: {
            normal: (_, { slots }) => h('span', { class: 'typo--xl' }, slots.default?.()),
          },
          marks: {
            link: ({ value }, { slots }) => {
              const target = value.blank ? '_blank' : undefined
              return h(
                'a',
                {
                  href: value.href,
                  target,
                  rel: target === '_blank' ? 'noopener' : undefined,
                  class: 'external-link',
                },
                slots.default?.()
              )
            },
            internalLink: ({ value }, { slots }) => {
              const url = `/project/${value.slug}`
              return h('a', { href: url, class: 'internal-link' }, slots.default?.())
            }
          },
        }
      }),
    ])
  },
};

useHead(() => ({
  bodyAttrs: {
    class: lightboxOpen.value ? 'overflow-hidden' : ''
  }
}));

</script>


<template>
  <div class="portable_text-container">
    <PortableText :value="props.data" :components="components" />
  </div>
</template>

<style>
.external-link {
  text-decoration: underline dashed var(--color-orange-200);
}

.internal-link {
  text-decoration: underline dashed var(--color-green-200);
}

.image-container {
  position: relative;
  display: inline-block;
}

.inline-image {
  height: 1.6rem;
  display: inline-block;
  vertical-align: baseline;
  margin: 0 0.7rem 0 0;
}

@media(--m) {
  .inline-image {
    height: 2.6rem;
    margin: 0 0.7rem 0 0;
  }
}

.enlarged {
  transform: scale(1.2);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @apply bg-gray-200;
  @apply backdrop-blur-sm;
  @apply bg-opacity-85;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.lightbox-image {
  max-height: 80svh;
  max-width: 90svw;
  width: auto;
  object-fit: contain;
}
</style>