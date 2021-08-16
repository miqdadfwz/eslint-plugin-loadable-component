import { BaseNodeWithoutComments } from 'estree';
import findParent, { NodeExtendable } from '../findParent';

describe('utils/findParent', () => {
  it('should return proper parent node', () => {
    const node: BaseNodeWithoutComments & NodeExtendable = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'test',
      },
      optional: true,
      arguments: [],
      parent: {
        type: 'VariableDeclaration',
        declarations: [],
        kind: 'const',
        parent: {
          type: 'Program',
          sourceType: 'module',
          body: [],
          parent: null,
        },
      },
    };

    const result = findParent(node, function (path) {
      return path.type === 'VariableDeclaration';
    });

    expect(result?.type).toBe('VariableDeclaration');
  });
});
