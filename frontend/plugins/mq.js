export default defineNuxtPlugin((nuxtApp) => {
	const mq = useMq()

	return {
		provide: {
			mq,
		},
	}
})
