import imageUrlBuilder from '@sanity/image-url'

export default defineNuxtPlugin(() => {
  const sanity = useSanity()
  const builder = imageUrlBuilder(sanity.client)

  function urlFor(source) {
    return builder.image(source)
  }

  return {
    provide: { urlFor },
  }
})