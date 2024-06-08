# Nuxt 3 Boilerplate

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

### Prerequisites:

- [mkcert](https://github.com/FiloSottile/mkcert) (Optional localhost HTTPS)

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Optional: Generate certificate for HTTPS for localhost

```bash
# mkdir certs
cd certs
mkcert localhost
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev

# https
npm run dev-https
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview

# https
npm run preview-https
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## State management

For simple data is possible to use native nuxt state management (useState). Otherwise, for complex data, is better to use Pinia

### useState Examples (in composables/states)

```
export const useGlobals = () => {
	const globals = useState("globals", () => {})

	const setGlobals = (data) => {
		globals.value = data
	}

	return {
		globals,
		setGlobals,
	}
}
```

```
export const useGlobals = () => useState("testGlobals")
const testGlobals = useGlobals()
testGlobals.value = { ... }
```

### pinia example (in store/\*\*)

```
export const useStore = defineStore("store", () => {
  return {}
})
```
