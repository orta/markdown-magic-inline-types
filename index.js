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
