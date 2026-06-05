/**
 * EXAMPLE service — a placeholder shared connector. Copy this shape for a real system.
 *
 * A service is THIN: connection + auth + raw transport, behind a small stable API. Keys come
 * from the environment (never embedded). Business logic stays in the agent, not here.
 */
const ENDPOINT = process.env.EXAMPLE_API_URL || "https://api.example.com"

/** Small, stable exported API. Reads the key at call time so tests/mocks can set env. */
export async function get(pathname = "/") {
  const key = process.env.EXAMPLE_API_KEY
  if (!key) throw new Error("EXAMPLE_API_KEY not set — see services/example/README.md")
  const res = await fetch(`${ENDPOINT}${pathname}`, { headers: { authorization: `Bearer ${key}` } })
  if (!res.ok) throw new Error(`example service: ${res.status} ${res.statusText}`)
  return res.json()
}
