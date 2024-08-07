import { SafeFunctionPayload, SafeFunctionResult } from "./types"

const safe = async <T, E extends Error>(
  fn: SafeFunctionPayload<T>,
): SafeFunctionResult<T, E> => {
  try {
    const data = await fn()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error }
  }
}

export const f = {
  safe,
}

export default {
  f,
}
