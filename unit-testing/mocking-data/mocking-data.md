---
title: Mocking Data
---

Many times the data mocks are repetitions of themselves. I've done this
myself, maybe you have as well. This chapter is simply there to put this
in as convention, to go ahead and edit moving forward.

## Function Composition ##

When it comes to creating re-usable data, there are two options:

One can use a function to generate a mock.

Alternatively, one can use a spread operator. For the most part, I
prefer a function to generate a mock. It gives the option to specify
parameters to be passed through. In addition, it enforces immutability.
However, I have worked on teams where functions appear to be out of
place.

```typescript
// this interface is in our users.interface.ts file
export interface User {
  id: string;
  name: string;
  location: string;
}
// this interface is in our users.interface.ts file
export interface Users {
  users: User[]
}

let generateMockUserData: Dictionary<User> = (user: User) -> {
  data[id]: {
    data
  }
}

let generateMockUsersData: Users = (data: Dictionary<User>) -> {
  users: {
    ...data
  }
}
```

By using the simple above function and the proper type annotation we
have the option to generate mocked data that is unique to our interface.
We also have the ability to pass in data as it is unique to our specific
use case.

## Core Constants ##

In addition to having function composition tied to our interfaces, odds
are that the data being passed in might have the same signature time and
time again.

Enter the three constant rule:

```typescript
const genericMockUsers: Users = {
  generateMockUsersData(
    generateMockUserData({
      id: '123',
      name: 'Charles',
      location: 'New York'
    }),
    generateMockUserData({
      id: '246',
      name: 'Lisa',
      location: 'London'
    }),
    generateMockUserData(
      {
        id: '468',
        name: 'Yoda',
        location: 'Canary Islands'
      }
    ),
  )
}

const genericMockUser: User = {
  generateMockUserData({
    id: '123',
    name: 'Charles',
    location: 'New York'
  }),
}
```

Moving forward, if any of this data has a unique signature, then you can
use the above functions to make sure you have the correct data.
