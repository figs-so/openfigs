import { test } from "node:test"
import assert from "node:assert/strict"
import { get } from "./index.mjs"

test("get() throws a clear error when the API key is missing", async () => {
  delete process.env.EXAMPLE_API_KEY
  await assert.rejects(() => get("/ping"), /EXAMPLE_API_KEY not set/)
})
