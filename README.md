## markdown-magic-inline-types

Lets you inline TypeScript types in your READMEs trivially. You pass in a file and the type to pick up in your README.

```md
<!-- AUTO-GENERATED-CONTENT:START (TYPE:src=./types.d.ts&symbol=B) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

Turns to:

````md
<!-- AUTO-GENERATED-CONTENT:START (TYPE:src=./types.d.ts&symbol=B) -->
<!-- The below code snippet is automatically added from ./types.d.ts -->
```ts
/** A */
type B = {
    /** C comment */
    c: string
}
```
<!-- AUTO-GENERATED-CONTENT:END -->
````

When you run `md-magic`.

### Setup

```sh
pnpm add markdown-magic-inline-types
```

Edit your config file:

```js
const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {
  transforms: {
    TYPE: require('markdown-magic-inline-types')
  }
}

const markdownPath = path.join(__dirname, 'README.md')
markdownMagic(markdownPath, config)
```

Then you run it like:

```sh
pnpm md-magic --config ./config.js
```

See [this PR for an example](https://github.com/shikijs/twoslash/pull/59).

### This repo

It's a pretty simple plugin, this README is basically longer than the source code. The rough gist is that it makes a TypeScript AST of the file, searches in that file with the name passed in as 'symbol' - then use a printer to print it.

### Contributing

You can run it locally:

```sh
git clone https://github.com/orta/markdown-magic-inline-types
cd markdown-magic-inline-types
pnpm

# Runs the example project in the repo
pnpm readme
```
