import traverse, { STOP } from 'eslint-traverse';

import type { Rule } from 'eslint';
import type { Identifier, TemplateLiteral, Node, ImportExpression } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          loose: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
    docs: {
      description: 'Prefer not to use full dynamic import as it can potentially cause large size chunk.',
      url: 'https://github.com/miqdadfwz/eslint-plugin-loadable-component/blob/master/docs/rules/no-full-dynamic-import.md',
      category: 'Best Practices',
    },
  },
  create(context) {
    const forbiddenNodes: ImportExpression[] = [];
    const leadingWebpackCommentRegex = /webpack(Include|Exclude)/;
    const { loose = false } = context.options.length ? context.options[0] : {};

    const message =
      'Dynamic expression for the import() argument is not recommended. Use static string literal instead.';

    return {
      'Program:exit'(node: Node) {
        let comments: { start?: number; end?: number; value: string }[] = [];

        if (node.type === 'Program') {
          comments = (node.comments || []).map((comment) => ({
            value: comment.value,
            start: comment.range?.[0],
            end: comment.range?.[1],
          }));
        }

        forbiddenNodes.forEach((n) => {
          const floorComment = n.range?.[0] || 0;
          const ceilComment = n.source.range?.[0] || 0;

          const leadingComment = comments.filter((comment) => {
            return (
              (comment.start || 0) > floorComment &&
              (comment.end || 0) < ceilComment &&
              leadingWebpackCommentRegex.test(comment.value)
            );
          });

          const hasLeadingComment = leadingComment.length > 0;

          if ((loose && !hasLeadingComment) || !loose) {
            context.report({
              node: n.source,
              message: message,
              loc: n.source.loc || { line: 0, column: 0 },
            });
          }
        });
      },
      ImportExpression(node) {
        const source = node.source;
        const isIdentifier = source.type === 'Identifier';
        const isTemplateLiteral = source.type === 'TemplateLiteral';
        const argumentIdentifier =
          (<Identifier>source).name || (<Identifier>(<TemplateLiteral>source).expressions?.[0])?.name;

        const [root] = context.getAncestors();

        traverse(context, root, function (path) {
          const variableIdentifier = (<Identifier>path.node.declarations?.[0]?.id)?.name;

          if ((isIdentifier || isTemplateLiteral) && variableIdentifier === argumentIdentifier) {
            forbiddenNodes.push(node);
            return STOP;
          }
        });
      },
    };
  },
};

export default rule;
