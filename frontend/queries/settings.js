export async function querySettings() {
  const { data } = await useSanityQuery(groq`
      *[_type == "settings"] {
  siteTitle,
  excerpt,
  "cover": coverImage.asset->url,
  "coverWidth": coverImage.asset->metadata.dimensions.width,
  "coverHeight": coverImage.asset->metadata.dimensions.height,
  "favicon": favicon.asset->url,
  "faviconWidth": favicon.asset->metadata.dimensions.width,
  "faiconHeight": favicon.asset->metadata.dimensions.height,
}`);
  const settings = data || null;
  return { settings };
}
