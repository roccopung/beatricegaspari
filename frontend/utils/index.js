import imageUrlBuilder from "@sanity/image-url";

// export const isSSR = () => typeof window === "undefined";

// export const isCrawler = () =>
//   !isSSR() &&
//   (!("onscroll" in window) ||
//     /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

// export const getRelativeUrl = (urlValue) => {
// 	const url = urlValue.replace(..., "/")

// 	if (url.startsWith("#")) {
// 		// TODO: Check if is necessary to return also path if /text#hash is passed
// 		return { hash: url }
// 	}
// 	return url
// }

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function urlFor(source) {
  const sanity = useSanity();
  const builder = imageUrlBuilder(sanity.client);
  return builder.image(source);
}
