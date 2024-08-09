import { test, assert, vi } from "vitest"

import * as f from "../src"

test("resolve", async () => {
  const mockFn = vi.fn().mockResolvedValue(1) as () => Promise<number>

  const result = await f.safe(mockFn)

  assert.equal(result.data, 1)
  assert.deepEqual(result.error, null)
})

test("reject", async () => {
  const mockError = new Error("Mock Error")

  const mockFn = vi.fn().mockRejectedValue(mockError)

  const result = await f.safe(mockFn)

  assert.equal(result.data, null)
  assert.deepEqual(result.error, mockError)
})

test("throw", async () => {
  const mockError = new Error("Mock Error")

  const result = await f.safe(() => {
    throw mockError
  })

  assert.equal(result.data, null)
  assert.deepEqual(result.error, mockError)
})

test("timeout with error", async () => {
  const result = await f.safe(
    async () => {
      await f.sleep(200)
    },
    { timeout: 100 },
  )

  assert.equal(result.data, null)
  assert.instanceOf(result.error, f.TimeoutError)
  assert.deepEqual(result.error, new f.TimeoutError(100))
})

test("retries with data", async () => {
  const mockObject = {
    counter: 0,
  }

  setTimeout(() => {
    mockObject.counter = 3
  }, 300)

  const result = await f.safe(
    async () => {
      if (mockObject.counter !== 3) throw new Error("Mock Error")
      return mockObject.counter
    },
    { retries: 4, retryDelay: 100 },
  )

  assert.equal(result.data, 3)
  assert.deepEqual(result.error, null)
})

test("retries with error", async () => {
  const mockError = new Error("Mock Error")

  const result = await f.safe(
    async () => {
      throw mockError
    },
    { retries: 3, retryDelay: 100 },
  )

  assert.equal(result.data, null)
  assert.deepEqual(result.error, mockError)
})
