# ymatuhin/storage

## About

This package makes it easy to use localStorage and sessionStorage in your projects. It handles all type casting and possible errors with inaccessibility of storages.

## Installation

Run `npm install ymatuhin/storage --save`, for pnpm use `pnpm add ymatuhin/storage`

## How to use

For basic usage with localStorage:

```ts
const nameStorage = createStorage("my-name");

// save provided value
nameStorage.set("Yury");

// get saved value
console.log(nameStorage.get());

// clear saved value
nameStorage.remove();
```

Works with any serialisable types:

```ts
const idsStorage = createStorage("ids");
idsStorage.set([1, 2, 3]);
console.log(idsStorage.get());
```

With session storage:

```ts
const nameStorage = createStorage("my-name", { type: "sessionStorage" });
```

You can add custom logger for your storage. It will call `logger` when you use `get`, `set` and `remove`.

```ts
const logger = (value) => console.log(value);
const nameStorage = createStorage("my-name", { logger });
```
