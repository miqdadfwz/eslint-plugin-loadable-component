import { Node } from 'estree';

export type NodeExtendable = Node & { parent: NodeExtendable };

/**
 * Find node parent based on certain condition
 * @param {Object} node - Node of AST.
 * @param {Function} testNode - If return true, the process will be stopped.
 */
function findParent(node: NodeExtendable, callback: (node: NodeExtendable) => boolean): NodeExtendable | null {
  if (callback(node)) {
    return node;
  }

  if (node.parent) {
    return findParent(node.parent, callback);
  }

  return null;
}

export default findParent;
