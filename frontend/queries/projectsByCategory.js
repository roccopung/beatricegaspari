export async function queryProjectsByCategory(inputCategory) {
  const { data } = await useSanityQuery(
    groq`
     *[_type == 'project' && $projectCategory in category[]->slug.current] | order(orderRank) {
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
      `,
    {
      projectCategory: inputCategory,
    }
  );
  const response = data || null;
  return { response };

}
