interface Success<T> {
  data: T
  error: null
}

interface Failure<E extends Error> {
  data: null
  error: E
}

export type Result<T extends any, E extends Error> = Success<T> | Failure<E>

export type SafeFunctionPayload<T> = () => Promise<T>

export type SafeFunctionResult<T, E extends Error> = Promise<Result<T, E>>
