# example service

A placeholder HTTP connector — the shape for a real service. Replace it.

> **Maintain:** keep the exported API stable + the test green; update this README when the API
> or env keys change.

## Use
```js
import { get } from "../../services/example/index.mjs"
const data = await get("/some/path")
```

## Env
- `EXAMPLE_API_KEY` (required) · `EXAMPLE_API_URL` (optional, defaults to a placeholder)

## API
- `get(pathname)` → parsed JSON. Throws if the key is missing or the request fails.
