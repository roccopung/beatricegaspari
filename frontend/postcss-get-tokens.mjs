import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const loadJSON = (pathname) => {
	const value = fs.readFileSync(path.join(__dirname, pathname), "utf-8")

	return JSON.parse(value)
}

export default ({ path }) => {
	const tokens = loadJSON(path)

	if (!tokens) {
		console.error("ERR: Tokens missing! postcss-get-tokens will not works")
		return {
			postcssPlugin: "postcss-get-tokens",
			prepare: () => ({
				AtRule: {
					"get-tokens": (atRule) => atRule.replaceWith([]),
				},
			}),
		}
	}
	return {
		postcssPlugin: "postcss-get-tokens",
		prepare: () => ({
			Once: (root, { AtRule }) => {
				const nodes = []

				Object.entries(tokens).forEach(([k1, v1]) => {
					if (k1 === "breakpoint") {
						Object.entries(v1).forEach(([k2, v2]) => {
							nodes.push(
								new AtRule({
									name: "custom-media",
									params: `--${k2} (min-width: ${v2})`,
								})
							)
						})
						Object.entries(v1).forEach(([k2, v2]) => {
							nodes.push(
								new AtRule({
									name: "custom-media",
									params: `--until-${k2} (max-width: ${v2})`,
								})
							)
						})
					}
					if (k1 === "media") {
						Object.entries(v1).forEach(([k2, v2]) => {
							nodes.push(
								new AtRule({
									name: "custom-media",
									params: `--${k2} ${v2}`,
								})
							)
						})
					}
				})

				root.append(...nodes)
			},
			OnceExit: () => {},
			AtRule: {
				"get-tokens": (atRule, { Declaration, AtRule }) => {
					const nodes = []
					const mediaRules = []

					Object.entries(tokens).forEach(([k1, v1]) => {
						if (k1 !== "darkMode") {
						  switch (typeof v1) {
							case "string":
							  nodes.push(new Declaration({ prop: `--${k1}`, value: v1 }));
							  break;
							case "object":
							  Object.entries(v1).forEach(([k2, v2]) => {
								switch (typeof v2) {
								  case "string":
									nodes.push(
									  new Declaration({ prop: `--${k1}-${k2}`, value: v2 })
									);
									break;
								  case "object":
									Object.entries(v2).forEach(([k3, v3], i) => {
									  if (
										i === 0 &&
										(tokens.media[k3] || tokens.breakpoint[k3])
									  ) {
										nodes.push(
										  new Declaration({
											prop: `--${k1}-${k2}`,
											value: v3,
										  })
										);
									  } else if (
										!tokens.media[k3] &&
										!tokens.breakpoint[k3]
									  ) {
										nodes.push(
										  new Declaration({
											prop: `--${k1}-${k2}-${k3}`,
											value: v3,
										  })
										);
									  } else {
										let mr = mediaRules.find(
										  (r) => r.params === `(--${k3})`
										);
										if (!mr) {
										  mr = new AtRule({
											name: "media",
											params: `(--${k3})`,
										  });
										  mr.append({ prop: `--${k1}-${k2}`, value: v3 });
										  mediaRules.push(mr);
										} else {
										  mr.append({ prop: `--${k1}-${k2}`, value: v3 });
										}
									  }
									});
									break;
								}
							  });
							  break;
						  }
						}
					  });

					nodes.push(...mediaRules)
					atRule.replaceWith(nodes)
				},
			},
		}),
	}
}

export const postcss = true
