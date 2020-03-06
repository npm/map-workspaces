# map-workspaces

Retrieves a name:pathname Map for a given workspaces config

## Install

`npm install map-workspaces`

## Usage:

```js
mapWorskpaces({
  workspaces: {
    packages: [
      "a",
      "b"
    ]
  }
}, { cwd })
// returns Map of package names and its locations
```

LICENSE

[ISC](./LICENSE)

