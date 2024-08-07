import { test, assert, vi } from "vitest"
import { f } from "../src"

test("resolve", async () => {
  const mockFn = vi.fn().mockResolvedValue(1) as () => Promise<number>

  const result = await f.safe(mockFn)

  assert.equal(result.data, 1)
  assert.equal(result.error, null)
})

test("reject", async () => {
  const mockError = new Error("Mock Error")

  const mockFn = vi.fn().mockRejectedValue(mockError)

  const result = await f.safe(mockFn)

  assert.equal(result.data, null)
  assert.equal(result.error, mockError)
})

test("throw", async () => {
  const mockError = new Error("Mock Error")

  const result = await f.safe(() => {
    throw mockError
  })

  assert.equal(result.data, null)
  assert.equal(result.error, mockError)
})
