export async function queryProjectsList() {
  const { data } = await useSanityQuery(groq`
    *[_type == "project"] | order(orderRank) {
        title, 
        year, 
        "cover": coverImage.asset->url, 
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

// export async function queryProjectsByCategory(inputCategory) {
//   const { data } = await useSanityQuery(
//     groq`
//    *[_type == 'project' && $categoryName in category[]->title] | order(orderRank) {
//         title, 
//         year, 
//         "cover": coverImage.asset->url, 
//         technique,
//         category[] -> {
//           _id,
//           title
//         }, 
//         "slug": slug.current,
//       }
//     `,
//     {
//       categoryName: inputCategory,
//     }
//   );

//   const response = data || null;
//   return { response };
// }
