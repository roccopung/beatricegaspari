export async function queryProject(inputSlug) {
  const nextData = ref(null);
  const prevData = ref(null);

  // Fetch the project data
  const { data } = await useSanityQuery(
    groq`
      *[_type == 'project' && slug.current==$projectSlug ][0] {
        TextBlock[] {
            ...,
            markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug.current
              }
            }
          },
        _id,
        'slug' : slug.current,
        title,
        year,
        client,
        technique,
        category[] -> {
          _id,
          title
        },
        description,
        gallery {
          images[] {
              "url": asset->url,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
              crop,
              hotspot
          },
        },
        pageBuilder[] {
          ...,
          TextBlock[] {
            ...,
            markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug.current
              }
            }
          }
        },
        seoSlug,
        seoTitle,
        seoKeywords,
        seoImage,
        seoExcerpt,
        'next':  *[_type == 'project' && orderRank > ^.orderRank] | order(orderRank asc)[0] {
          _id,
            'slug' : slug.current,
          title,
          year,
        },
        'prev':  *[_type == 'project' && orderRank < ^.orderRank] | order(orderRank desc)[0] {
          _id,
          'slug' : slug.current,
          year,
        },
      }
    `,
    {
      projectSlug: inputSlug,
    }
  );

  const response = data || null;

  return { response, nextData, prevData };
}
