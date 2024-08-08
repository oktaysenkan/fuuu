import { SafeFunctionPayload, SafeFunctionResult } from "./types"

export * from "./types"

export const safe = async <T, E extends Error = Error>(
  fn: SafeFunctionPayload<T>,
): SafeFunctionResult<T, E> => {
  try {
    const data = await fn()
    return { data, error: null }
  } catch (error: any) {
    return { error, data: null }
  }
}
