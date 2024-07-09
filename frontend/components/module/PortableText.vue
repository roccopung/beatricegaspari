<script setup>
import { PortableText } from '@portabletext/vue';

const props = defineProps({
  data: {
    type: Array || Object,
  },
});

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
              console.log(value)
              const {slug = {}} = value
              const href = `/project/${slug.current}`
              return h('nuxtlink', { href: href, class: 'underline' }, slots.default?.())
            }
  },
  types: {
    textBlock: (props) => h('div', { class: 'text-block' }, [
      h('h3', { class: 'typo--xl opacity-35' }, props.value.title),
      h(PortableText, {
        value: props.value.TextBlock,
        components: {
          block: {
            normal: (_, { slots }) => h('p', { class: 'typo--xl' }, slots.default?.()),
          },
          marks: {
            link: ({ value }, { slots }) => {
              const target = value.blank ? '_blank' : undefined
              console.log(value)
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
              console.log(value)
              const slug = value
              const url = `/project/${slug.current}`
              return h('nuxtlink', { href: url, class: 'internal-link' }, slots.default?.())
            }
          },
        }
      }),
    ]),
    // image: (props) => h('img', { src: props.value.asset.url, alt: props.value.alt || '' }),
  },
};


console.log(props.data)

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
</style>