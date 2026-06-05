/**
 * EXAMPLE capability door — replace me.
 *
 * A "capability door" is the single, swappable entry to ONE external system. The rules:
 *   - the agent reaches the outside world ONLY through a door (never ad-hoc fetch/connect
 *     scattered through its code);
 *   - the door reads its credentials from the ENVIRONMENT — keys are NEVER embedded in agent
 *     files or committed (see .env.example);
 *   - one door per system, so it's easy to audit, mock, and swap.
 *
 * This stub talks to a placeholder HTTP API. Copy it to lib/doors/<system>.mjs and adapt
 * (a DB door, a portal door, etc. follow the same shape).
 */
const ENDPOINT = process.env.EXAMPLE_API_URL || "https://api.example.com"
const KEY = process.env.EXAMPLE_API_KEY

/** The single entry point. Throws a clear error if the key is missing. */
export async function exampleGet(pathname = "/") {
  if (!KEY) {
    throw new Error("EXAMPLE_API_KEY not set — see .env.example. Keys live in the environment, never in code.")
  }
  const res = await fetch(`${ENDPOINT}${pathname}`, { headers: { authorization: `Bearer ${KEY}` } })
  if (!res.ok) throw new Error(`example door: ${res.status} ${res.statusText}`)
  return res.json()
}

// CLI smoke test:  node lib/doors/example.mjs /ping
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  exampleGet(process.argv[2]).then((d) => console.log(d)).catch((e) => {
    console.error(e.message)
    process.exit(1)
  })
}
