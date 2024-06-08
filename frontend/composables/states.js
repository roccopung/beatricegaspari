/* 

Examples of useState. 
Before to use it, try to understand if is convenient than pinia 

IMHO: only for simple data (avoid complex objects)

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

*/
