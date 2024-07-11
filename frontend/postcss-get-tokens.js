const loadTokensFile = (path) => {
  const filePath = path || "./assets/css/tokens.json";
  if (!path) {
    console.log(
      `\u{1F92F} WARN: Tokens path missing! Try to get it from ${filePath}`
    );
  }
  try {
    if (require.cache?.[require.resolve(filePath)]) {
      delete require.cache[require.resolve(filePath)];
      console.log("\u{1F485} Reload css tokens ...");
    }
    return require(filePath);
  } catch (e) {
    console.error("ERR: Failed to load tokens file. ", e);
    return;
  }
};

export default ({ path }) => {
  const tokens = loadTokensFile(path);

  if (!tokens) {
    console.error("ERR: Tokens missing! postcss-get-tokens will not works");
    return {
      postcssPlugin: "postcss-get-tokens",
      prepare: () => ({
        AtRule: {
          "get-tokens": (atRule) => atRule.replaceWith([]),
        },
      }),
    };
  }
  return {
    postcssPlugin: "postcss-get-tokens",
    prepare: () => ({
      Once: (root, { AtRule }) => {
        const nodes = [];

        Object.entries(tokens).forEach(([k1, v1]) => {
          if (k1 === "breakpoint") {
            Object.entries(v1).forEach(([k2, v2]) => {
              nodes.push(
                new AtRule({
                  name: "custom-media",
                  params: `--${k2} (min-width: ${v2})`,
                })
              );
            });
          }
          if (k1 === "media") {
            Object.entries(v1).forEach(([k2, v2]) => {
              nodes.push(
                new AtRule({
                  name: "custom-media",
                  params: `--${k2} ${v2}`,
                })
              );
            });
          }
        });

        root.append(...nodes);
      },
      OnceExit: () => {},
      AtRule: {
        "get-tokens": (atRule, { Declaration, AtRule }) => {
          const nodes = [];
          const mediaRules = [];
          const darkModeRules = [];

          if (tokens.darkMode) {
            const darkModeAtRule = new AtRule({
              name: "media",
              params: "(prefers-color-scheme: dark)",
            });

            Object.entries(tokens.darkMode).forEach(([k1, v1]) => {
              if (typeof v1 === "object") {
                Object.entries(v1).forEach(([k2, v2]) => {
                  if (typeof v2 === "object") {
                    Object.entries(v2).forEach(([k3, v3]) => {
                      darkModeAtRule.append(
                        new Declaration({
                          prop: `--${k1}-${k2}-${k3}`,
                          value: v3,
                        })
                      );
                    });
                  } else {
                    darkModeAtRule.append(
                      new Declaration({ prop: `--${k1}-${k2}`, value: v2 })
                    );
                  }
                });
              } else {
                darkModeAtRule.append(
                  new Declaration({ prop: `--${k1}`, value: v1 })
                );
              }
            });

            darkModeRules.push(darkModeAtRule);
          }

          Object.entries(tokens).forEach(([k1, v1]) => {
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
          });

          nodes.push(...mediaRules, ...darkModeRules);
          atRule.replaceWith(nodes);
        },
      },
    }),
  };
};

export const postcss = true;
