/**
 * EXAMPLE gateway — this agent's own. Copy + adapt for a bespoke system, or delete.
 *
 * First check `/services`: if a shared service exists for this system, USE IT (import it). A
 * gateway is only for a system with no service, or to wrap a service with your own logic.
 *
 * A "gateway" is how THIS agent (a system) reaches ONE other system — a database, an API, a
 * portal. System-to-system. Each agent **owns its own gateways and may duplicate the code**
 * rather than share it: a shared gateway that "improves" while serving agent A can silently
 * break agent B, and **stability beats DRY** for logic an agent depends on. (Stable infra like
 * the report helper is fine to share; connection/business logic is not.)
 *
 * Rules:
 *   - reach the outside ONLY through a gateway (no ad-hoc fetch/connect scattered around);
 *   - read credentials from the ENVIRONMENT (this agent's .env) — never embed keys in code;
 *   - one gateway per system, so it's easy to audit, mock, and swap.
 *
 * This stub talks to a placeholder HTTP API. Copy it to gateways/<system>.mjs and adapt.
 */
const ENDPOINT = process.env.EXAMPLE_API_URL || "https://api.example.com"
const KEY = process.env.EXAMPLE_API_KEY

/** The single entry point. Throws a clear error if the key is missing. */
export async function exampleGet(pathname = "/") {
  if (!KEY) {
    throw new Error("EXAMPLE_API_KEY not set — see .env.example. Keys live in this agent's .env, never in code.")
  }
  const res = await fetch(`${ENDPOINT}${pathname}`, { headers: { authorization: `Bearer ${KEY}` } })
  if (!res.ok) throw new Error(`example gateway: ${res.status} ${res.statusText}`)
  return res.json()
}

// CLI smoke test:  node gateways/example.mjs /ping
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  exampleGet(process.argv[2]).then((d) => console.log(d)).catch((e) => {
    console.error(e.message)
    process.exit(1)
  })
}
