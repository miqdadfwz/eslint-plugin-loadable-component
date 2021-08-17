import traverse, { STOP } from 'eslint-traverse';
import findParent, { NodeExtendable } from '../utils/findParent';
import type { Rule } from 'eslint';
import type { Node, CallExpression, Identifier, ObjectExpression, Property, ReturnStatement } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
    docs: {
      description: 'Recommend to use fallback option.',
      url: 'https://github.com/miqdadfwz/eslint-plugin-loadable-component/blob/master/docs/rules/no-empty-fallback.md',
      category: 'Best Practices',
    },
  },
  create(context) {
    let importedIdentifierName: string | undefined = '';
    let functionIdentifierName: string | undefined = '';
    let isFromExportedModule = false;
    let loadableIdentifierName = '';

    let complainedJSXNode: Node | null = null;
    let complainedCallExpressionNode: CallExpression | null = null;

    const importedSource = '@loadable/component';

    return {
      'Program:exit'() {
        if (
          (complainedCallExpressionNode && complainedJSXNode) ||
          (isFromExportedModule && complainedCallExpressionNode)
        ) {
          context.report({
            node: complainedCallExpressionNode,
            loc: complainedCallExpressionNode.loc || { line: 0, column: 0 },
            message: 'Prefer to render fallback in place of the component that not "ready" yet.',
          });
        }
      },
      ImportDeclaration(node) {
        if (node.source.value === importedSource) {
          importedIdentifierName = node.specifiers.find((specifier) => specifier.type === 'ImportDefaultSpecifier')
            ?.local?.name;
        }
      },
      CallExpression(node: CallExpression & NodeExtendable) {
        if ((<Identifier>node.callee).name === importedIdentifierName) {
          const hasFallback = (<Property[]>(<ObjectExpression>node.arguments?.[1])?.properties || []).some(
            (property) => (<Identifier>property.key).name === 'fallback' && Boolean(property.value),
          );

          const functionNode = findParent(node, (path) => {
            const nodeType = path.type;
            const parentType =
              nodeType === 'FunctionExpression' || nodeType === 'ArrowFunctionExpression'
                ? path.parent?.parent?.parent?.type
                : path.parent?.type;

            const isFunctionType =
              nodeType === 'FunctionExpression' ||
              nodeType === 'FunctionDeclaration' ||
              nodeType === 'ArrowFunctionExpression';

            return isFunctionType && parentType === 'Program';
          });

          if (functionNode && !hasFallback) {
            // @ts-ignore
            functionIdentifierName = (functionNode.id || functionNode.parent?.id)?.name;
            importedIdentifierName = functionIdentifierName;
          } else if (functionNode && hasFallback) {
            complainedCallExpressionNode = null;
          } else {
            complainedCallExpressionNode = !hasFallback ? node : null;
          }
        }
      },
      VariableDeclarator(node) {
        if (
          node.init?.type === 'CallExpression' &&
          ((<Identifier>node.init.callee).name === importedIdentifierName ||
            (<Identifier>node.init.callee).name === functionIdentifierName)
        ) {
          loadableIdentifierName = (<Identifier>node.id).name;
        }
      },
      JSXOpeningElement(node: any) {
        if (node.name.name === loadableIdentifierName) {
          const hasFallback = node.attributes.some((prop: any) => {
            return prop.name.name === 'fallback' && Boolean(prop.value);
          });

          complainedJSXNode = !hasFallback ? node : null;
        }
      },
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === 'Identifier' && node.declaration.name === loadableIdentifierName) {
          isFromExportedModule = true;
          return STOP;
        }
      },
      ExportNamedDeclaration(node) {
        traverse(context, node, function (path) {
          if (path.node.type === 'CallExpression' && path.node.callee.name === importedIdentifierName) {
            isFromExportedModule = true;
            return STOP;
          }
        });
      },
    };
  },
};

export default rule;
