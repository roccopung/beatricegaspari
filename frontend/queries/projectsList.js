export async function queryProjectsList() {
  const { data } = await useSanityQuery(groq`
    *[_type == "project"] | order(orderRank) {
       _id,
        title, 
        year, 
        "cover": coverImage.asset->url,
        "coverWidth": coverImage.asset->metadata.dimensions.width,
        "coverHeight": coverImage.asset->metadata.dimensions.height,
        technique,
        category[] -> {
          _id,
          title
        }, 
        "slug": slug.current,
      }
    `);

  const response = data || null;
  return { response };
}
