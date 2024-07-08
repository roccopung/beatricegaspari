export async function queryNavigation() {
  const { data } = await useSanityQuery(groq`
    {

      "all": count(*[_type == "project"]),
      
      "categories": *[_type == "category"] {
        title,
        "slug": slug.current,
        "count": count(*[_type == "project" && references(^._id)])
      } | order(title asc),
      
      "about": *[_type == "about"][0] {
        aboutDescription,
        contacts
      }
    }
  `);

  const response = data || null;
  return { response };
}
