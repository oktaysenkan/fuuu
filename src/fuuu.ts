import { TimeoutError } from "./errors"
import {
  SafeFunctionOption,
  SafeFunctionPayload,
  SafeFunctionResult,
  SafeSyncFunctionPayload,
  SafeSyncFunctionResult,
} from "./types"
import { sleep } from "./utils"

export const safe = async <T, E extends Error = Error>(
  fn: SafeFunctionPayload<T>,
  options?: SafeFunctionOption,
): SafeFunctionResult<T, E> =>
  new Promise(async (resolve) => {
    const defaultOptions = {
      ...options,
      retries: options?.retries ?? 1,
      retryDelay: options?.retryDelay ?? 0,
    }

    const retriesAsArray = Array.from({ length: defaultOptions.retries })

    if (defaultOptions.timeout)
      sleep(defaultOptions.timeout).then(() => {
        return resolve({
          data: null,
          error: new TimeoutError(defaultOptions.timeout!) as E,
        })
      })

    let error: Error | null = null

    for await (const _retry of retriesAsArray) {
      try {
        const data = await fn()
        return resolve({ data, error: null })
      } catch (throwable: any) {
        error = throwable as E
        await sleep(defaultOptions.retryDelay)
      }
    }

    return resolve({
      error: error as E,
      data: null,
    })
  })

export const syncSafe = <T, E extends Error = Error>(
  fn: SafeSyncFunctionPayload<T>,
): SafeSyncFunctionResult<T, E> => {
  try {
    const data = fn()
    return { data, error: null }
  } catch (throwable: any) {
    return { error: throwable, data: null }
  }
}
