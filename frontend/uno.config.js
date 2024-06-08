import { defineConfig, presetMini } from "unocss"
import { breakpoint, space, color } from "./assets/css/tokens.json"

const rules = [
	[
		/^grid-(.*)-?(.*)?$/,
		([, c]) => {
			const [cols, gap] = c.split("-")
			return {
				display: "grid",
				"grid-template-columns": `repeat(${cols || 12}, 1fr)`,
				"grid-gap": `var(--space-${gap || "gap"})`,
			}
		},
	],
	[
		/^col-(.*)$/,
		([, c]) => {
			return {
				"grid-column": c.replace(/\[|\]|\-/g, " "),
			}
		},
	],
	[
		/^gap-?(.*)?$/,
		([, c]) => {
			return {
				gap: `var(--space-${c || "gap"})`,
			}
		},
	],
	[
		/^(p|m)-(.*)?-?(.*)?-?(.*)?-?(.*)?$/,
		(match) => {
			let [, PaddingOrMargin, t, r, b, l] = match

			const isPadding = PaddingOrMargin === "m" ? false : true
			const List = []
			for (const e of [t, r, b, l].filter(Boolean)) {
				if (!e || e === "auto") {
					List.push("auto")
				} else List.push(`var(--space-${e})`)
			}
			return isPadding
				? { padding: List.join(" ") }
				: { margin: List.join(" ") }
		},
		{ autocomplete: "p|m-<var>-<var>-<var>-<var>" },
	],
	[
		/^(p|m)(t|r|b|l)-(.*)$/,
		(match) => {
			let [, PaddingOrMargin, dir, val] = match
			const positions = {
				t: "top",
				r: "right",
				b: "bottom",
				l: "left",
			}
			let pos = positions[dir]

			const isPadding = PaddingOrMargin === "m" ? false : true

			return isPadding
				? { [`padding-${pos}`]: `var(--space-${val})` }
				: { [`margin-${pos}`]: `var(--space-${val})` }
		},
		{ autocomplete: "p|m(t|r|b|l)-<var>" },
	],
	[
		/^ratio-(.*)$/,
		([, c]) => ({
			"aspect-ratio": c.replace(/\[|\]|\-/g, " "),
		}),
	],
	[
		/^(px|py|mx|my)-(.*)-?(.*)?$/,
		(match) => {
			const [, direction, s, optional] = match
			const combination = {
				px: "padding-inline",
				py: "padding-block",
				mx: "margin-inline",
				my: "margin-block",
			}

			const returndirection = combination[direction]

			let value = `var(--space-${s})`
			value += optional ? ` var(--space-${optional})` : ""
			return { [returndirection]: value }
		},
		{ autocomplete: "px|py|mx|my-<var>-<var>" },
	],
	[
		/^flex-(row|col|start|center|end|btw)-?(start|center|end|btw)?-?(start|center|end|btw)?$/,
		(match) => {
			const [, directionOrJustify, justifyOrAlign, align] = match
			let directionValue = directionOrJustify
			let justifyValue = justifyOrAlign
			let alignValue = align

			if (directionOrJustify !== "row" && directionOrJustify !== "col") {
				directionValue = "row"
				justifyValue = directionOrJustify
				alignValue = justifyOrAlign
			}
			const columORrow = directionValue === "row" ? "row" : "column"

			const values = {
				start: "flex-start",
				center: "center",
				end: "flex-end",
				btw: "space-between",
			}

			return {
				display: "flex",
				"flex-direction": columORrow,
				"justify-content": values[justifyValue],
				"align-items": values[alignValue],
			}
		},
		{ autocomplete: "flex-(row|col|start|center|end|btw)" },
	],
	[
		/^scrollbar-hide$/,
		([_]) => {
			return `.scrollbar-hide{scrollbar-width:none}
.scrollbar-hide::-webkit-scrollbar{display:none}`
		},
	],
	[
		/^scrollbar-default$/,
		([_]) => {
			return `.scrollbar-default{scrollbar-width:auto}
.scrollbar-default::-webkit-scrollbar{display:block}`
		},
	],
]

export default defineConfig({
	theme: {
		colors: color,
		breakpoints: breakpoint,
	},
	rules: rules,
	presets: [
		presetMini({
			dark: false,
			arbitraryVariants: false,
			preflight: false,
		}),
	],
	shortcuts: [
		{
			grid: "grid-12-gap",
		},
	],
	safelist: [
		...Array.from({ length: 12 }, (_, i) => `grid-${i + 1}`),
		...Object.keys(space).map((e) => `pb-${e}`),
	],
})
