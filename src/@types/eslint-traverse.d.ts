declare module 'eslint-traverse' {
  import type { Rule } from 'eslint';
  import type { Node } from 'estree';

  function traverse(context: Rule.RuleContext, node: Node, callback: (path: any) => void): void;

  export const STOP: symbol;
  export const SKIP: symbol;
  export default traverse;
}
