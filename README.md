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


### This repo

It's a pretty simple plugin, this README is basically longer than the source code. The rough gist is that it makes a TypeScript AST of the file, searches in that file with the name passed in as 'symbol' - then use a printer to print it.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./index.js) -->
<!-- The below code snippet is automatically added from ./index.js -->
```js
// @ts-check
const ts = require("typescript");

/* Match <!-- AUTO-GENERATED-CONTENT:START (TYPE:src=filepath&symbol=Type) --> */
module.exports = function TYPE(_content, options) {
  const mds = [];
  let program = ts.createProgram([options.src], {});
  const sourceFile = program.getSourceFile(options.src);

  /** @type {import("typescript").TypeAliasDeclaration} */
  let typeNode = undefined;
  const findSymbol = (node) => {
    if ( node && node.name && node.name.escapedText && node.name.escapedText === options.symbol) {
      typeNode = node;
    }

    if (!typeNode) ts.forEachChild(node, findSymbol);
  };

  findSymbol(sourceFile);
  if (!typeNode)
    throw new Error(`Could not find ${options.symbol} in ${options.src}`);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, typeNode, sourceFile);
};
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Contributing

You can run it locally:

```sh
git clone https://github.com/orta/markdown-magic-inline-types
cd markdown-magic-inline-types
pnpm

# Runs the example project in the repo
pnpm readme
```
