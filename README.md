<p align="center">
  <img src="https://github.com/user-attachments/assets/d2796ecb-9aa4-4e42-a172-1d4d1d9a96fd" width="150px" />
</p>
<h1 align="center">fuu</h1>
<p align="center">
Don’t lose your mind, safely execute functions.
</p>

<hr />

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

## Motivation

In software development, handling asynchronous operations and potential errors gracefully is crucial for building robust applications. Traditionally, developers rely on try-catch blocks to manage errors in asynchronous code. While this approach works, it can lead to verbose and repetitive code, making it harder to maintain and reason about.

The fuuu library simplifies this process by providing a clean and concise way to handle errors in asynchronous functions. Instead of wrapping every function call in a try-catch block, fuuu allows you to safely execute functions and handle errors more elegantly. With features like retries and timeouts, fuuu ensures that your application can handle transient errors and network issues without losing stability.

By using fuuu, you reduce boilerplate code and make your error-handling strategy more consistent across your application. This not only improves code readability but also makes it easier to manage complex asynchronous workflows, leading to more reliable and maintainable software.

```ts
import * as f from "fuuu"

const withTryCatch = async () => {
  let profile: Profile | null = null

  try {
    profile = await fetchUserProfileById(1)
  } catch (e) {
    throw new Error("An error occurred while fetching profile")
  }

  try {
    const friends = await fetchFriendsByAccountId(profile.accountId)

    return { profile, friends }
  } catch (e) {
    return { profile, friends: null }
  }
}

const withFuuu = async () => {
  const profile = await f.safe(() => fetchUserProfileById(1))

  if (profile.error) throw new Error("An error occurred while fetching profile")

  const friends = await f.safe(() =>
    fetchFriendsByAccountId(profile.data.accountId),
  )

  return { profile: profile.data, friends: friends.data }
}
```
