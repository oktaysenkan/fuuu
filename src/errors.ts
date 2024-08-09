export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`The operation exceeded the time limit of ${ms}ms and was aborted.`)
    this.name = "TimeoutError"
  }
}
