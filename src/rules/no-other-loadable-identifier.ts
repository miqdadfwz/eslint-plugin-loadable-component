import traverse from 'eslint-traverse';
import findParent, { NodeExtendable } from '../utils/findParent';

import type { Rule } from 'eslint';
import type { Node, ImportDeclaration, Function, CallExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    schema: [],
    docs: {
      url: 'https://github.com/miqdadfwz/eslint-plugin-loadable-component/blob/master/docs/rules/no-other-loadable-identifier.md',
      category: 'Possible Errors',
      description: 'Disallow other "loadable" keyword',
    },
  },
  create(context) {
    const validDefaultIdentifier = 'loadable';
    const complain = (wrongIdentifer?: string) =>
      `If you are running on SSR, @loadable/babel-plugin is unable to detect "${wrongIdentifer}" identifier, use "${validDefaultIdentifier}" instead.`;

    let importedIdentifierName: string | undefined;

    return {
      'Program:exit'(node: Node) {
        if (typeof importedIdentifierName !== undefined) {
          return traverse(context, node, function (path) {
            if (path.node.type === 'CallExpression' && path.node.callee?.name === importedIdentifierName) {
              const callExpressionNode: CallExpression = path.node;

              const parentFunctionNode = findParent(callExpressionNode as NodeExtendable, (p) => {
                const isFunctionExpression =
                  p.type === 'FunctionExpression' && p.parent?.parent?.parent?.type === 'Program';

                const isFunctionDeclaration = p.type === 'FunctionDeclaration' && p.parent?.type === 'Program';

                const isArrowFunctionExpression =
                  p.type === 'ArrowFunctionExpression' && p.parent?.parent?.parent?.type === 'Program';

                return isFunctionExpression || isFunctionDeclaration || isArrowFunctionExpression;
              });

              if (parentFunctionNode) {
                const n = parentFunctionNode as Function;
                // @ts-ignore
                const functionIdentifier = (n.id || n.parent.id).name;

                if (functionIdentifier !== validDefaultIdentifier) {
                  context.report({
                    node: callExpressionNode,
                    loc: callExpressionNode.loc || { line: 0, column: 0 },
                    message: complain(functionIdentifier),
                  });
                }
              } else if ((<Identifier>callExpressionNode.callee)?.name !== validDefaultIdentifier) {
                context.report({
                  node: callExpressionNode,
                  loc: callExpressionNode.loc || { line: 0, column: 0 },
                  message: complain((<Identifier>callExpressionNode.callee)?.name),
                });
              }
            }
          });
        }
      },
      ImportDeclaration(node: ImportDeclaration) {
        const importDeclarationValue = '@loadable/component';
        const importedSourceName = node.source.value;
        const isImportValueExists = importedSourceName === importDeclarationValue;

        if (isImportValueExists) {
          importedIdentifierName = node.specifiers.find((specifier) => specifier.type === 'ImportDefaultSpecifier')
            ?.local?.name;
        }
      },
    };
  },
};

export default rule;
