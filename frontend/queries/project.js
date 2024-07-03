export async function projectQuery(inputSlug) {
  const nextData = ref(null);
  const prevData = ref(null);

  // Fetch the project data
  const { data } = await useSanityQuery(
    groq`
      *[_type == 'project' && slug.current==$projectSlug ][0] {
        _id,
        'slug' : slug.current,
        title,
        year,
        client,
        collaborators,
        url,
        directUrl,
        video,
        gallery[] {
          images[] {
              'itemUrl': asset->url,
              crop,
              hotspot
          },
        },
        category[] -> {
          _id,
          title
        },
        'imageUrl': cover.asset->url,
        roles[] -> {
          _id,
          title
        },
        summary,
        tech,
        description,
        pageBuilder[],
          'next':  *[_type == 'project' && orderRank > ^.orderRank] | order(orderRank asc)[0] {
          _id,
            'slug' : slug.current,
          title,
          year,
        },
          'prev':  *[_type == 'project' && orderRank < ^.orderRank] | order(orderRank desc)[0] {
          _id,
          'slug' : slug.current,
        title,
        year,
        }
      }
    `,
    {
      projectSlug: inputSlug,
    }
  );

  const response = data || null;

  return { response, nextData, prevData };
}
