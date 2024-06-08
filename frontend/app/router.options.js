export default {
	scrollBehavior: (to, from, savedPosition) => {
		const nuxtApp = useNuxtApp()
		if (savedPosition) {
			return savedPosition
		}
		return new Promise(async (resolve) => {
			nuxtApp.hook("page:transition:finish", async () => {
				await nextTick()
				resolve({ top: 0 })
			})
		})
	},
}
