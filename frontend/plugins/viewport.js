import { createSharedComposable } from "@vueuse/core"

const isSmartphone = () =>
	process.client &&
	/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)

const isInstagram = () =>
	process.client && navigator.userAgent.match(/instagram/i)

const checkInstagramHeight = () => {
	const heightBlock = document.createElement("div")
	const style = {
		position: "fixed",
		top: 0,
		right: 0,
		left: 0,
		height: "-webkit-fill-available",
	}
	Object.assign(heightBlock.style, style)
	document.body.appendChild(heightBlock)
	const vh = heightBlock.clientHeight
	heightBlock.parentNode.removeChild(heightBlock)
	return `${vh}px`
}

const setVh = () => {
	if (isSmartphone() && !isInstagram()) {
		return `${window.innerHeight * 0.01}px`
	} else if (isInstagram()) {
		return checkInstagramHeight()
	} else {
		return "1vh"
	}
}

const injectCSS = (inlineStyle) => {
	const css = `:root{ ${inlineStyle}; --credits: plcd.nl }`
	const styleEl = document.getElementById("viewport-style")
	if (styleEl) {
		styleEl.innerText = css
	} else {
		const el = document.createElement("style")
		el.id = "viewport-style"
		el.type = "text/css"
		el.innerText = css
		document.head.appendChild(el)
	}
}

export const useViewport = createSharedComposable(() => {
	return { vw, vh, dvh, viewportStyle }
})

export default defineNuxtPlugin({
	name: "viewport",
	parallel: true,
	enforce: "pre",
	async setup(nuxtApp) {
		const supportDvh = useSupported(
			() => process.client && CSS && CSS.supports("height", "1dvh")
		)
		const supportSvh = useSupported(
			() => process.client && CSS && CSS.supports("height", "1svh")
		)
		const { width, height } = useWindowSize({ includeScrollbar: false })

		const vh = ref()
		const vw = computed(() =>
			process.client ? `${width.value / 100}px` : "1vw"
		)
		const dvh = computed(() =>
			supportDvh.value
				? "1dvh"
				: isSmartphone() && !isInstagram()
				? `${height.value / 100}px`
				: `1vh`
		)
		const viewportStyle = computed(
			() => `--vw: ${vw.value}; --vh: ${vh.value}; --dvh: ${dvh.value}; `
		)

		const setClassicVh = () => {
			vh.value = supportSvh.value ? "1svh" : setVh()
		}

		nuxtApp.hook("app:mounted", () => {
			setClassicVh()

			if (!supportSvh.value) {
				useEventListener("resize", useDebounceFn(setClassicVh, 500))
				useEventListener("orientationchange", useDebounceFn(setClassicVh, 500))
			}

			injectCSS(viewportStyle.value)

			watchDebounced(
				viewportStyle,
				() => {
					injectCSS(viewportStyle.value)
				},
				{ debounce: 500 }
			)
		})
	},
})
