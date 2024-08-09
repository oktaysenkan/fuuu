# fuuu

A TypeScript utility function to safely execute asynchronous functions.

## Installation

You can install this package using npm:

```sh
npm install fuuu
```

## Usage

```ts
import * as f from "fuuu"

interface People {
  name: string
  height: string
  mass: string
  gender: string
}

const getVaderDetails = async () => {
  const response = await fetch("https://swapi.dev/api/people/4/")
  return response.json() as Promise<People>
}

const main = async () => {
  const vader = await f.safe(getVaderDetails)

  if (vader.error) {
    // error handling
    return
  }

  console.log(vader.data)
}
```

#### Retries

```ts
const vader = await f.safe(getVaderDetails, {
  retries: 3,
  retryDelay: 1000,
})
```

#### Timeout

```ts
const vader = await f.safe(getVaderDetails, {
  timeout: 3000,
})

const isTimeoutError = vader.error instanceof f.TimeoutError
```
