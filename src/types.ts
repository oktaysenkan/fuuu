export interface Success<T> {
  data: T
  error: null
}

export interface Failure<E extends Error = Error> {
  data: null
  error: E
}

export type Result<T extends any, E extends Error = Error> =
  | Success<T>
  | Failure<E>

export type SafeFunctionPayload<T> = () => Promise<T> | T

export type SafeFunctionResult<T, E extends Error = Error> = Promise<
  Result<T, E>
>

export type SafeSyncFunctionPayload<T> = () => T

export type SafeSyncFunctionResult<T, E extends Error = Error> = Result<T, E>
