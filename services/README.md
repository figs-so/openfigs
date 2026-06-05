# Services — the shared connector library

A **service** is a thin, stable, **tested** connector to ONE external system that **many agents
reuse** — a database, Slack, email, Snowflake, Salesforce, SAP… This is OpenFigs's **expansion
surface**: the community grows the fleet's reach by adding services here.

> **Maintain:** keep each service thin and its exported contract stable; if you change a service
> its test must stay green (many agents depend on it). List every service under *Services* below.

## What a service is (and isn't)

- **Is:** connection + auth + raw transport, behind a small, stable exported API; keys from the
  environment; one service per system.
- **Isn't:** business logic. *What* to fetch and *how* to process it stays in the agent (its
  gateway / its own code). A service that creeps into logic becomes the shared code that breaks
  agent B when "improved" for agent A — **keep it thin.**

## How to add a service (the contract)

Create `services/<system>/`:
- `index.mjs` — export a small, **stable** API; read credentials from `process.env` (never embed keys).
- `<system>.test.mjs` — a test, run with `node --test`. Shared code others depend on must be tested.
- `README.md` — what it does, the env keys it needs, and its exported API.

Keep the exported API stable — downstream agents depend on it. Additive changes are safe;
breaking changes need a new version or a heads-up.

## Services

- `example/` — a placeholder HTTP connector showing the shape. Replace / extend.

## Future: MCP-backed services

[Model Context Protocol](https://modelcontextprotocol.io) is the emerging standard for
agent↔system connections — an MCP server is essentially a connector. A future service type can
wrap an MCP server, exposing any MCP-connected system (and the whole MCP ecosystem) through this
same `services/` contract. Not built yet; the layer is designed to accommodate it.
