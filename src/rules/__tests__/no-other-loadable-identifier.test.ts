import { RuleTester } from 'eslint';
import rule from '../no-other-loadable-identifier';

const correctName = 'loadable';
const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const printMsg = (wrongName: string) =>
  `If you are running on SSR, @loadable/babel-plugin is unable to detect "${wrongName}" identifier, use "${correctName}" instead.`;

ruleTester.run('no-other-loadable-identifier', rule, {
  valid: [
    {
      code: `
        import loadable from '@loadable/component';
        export default loadable(() => import('.'));
      `,
    },
    {
      code: `
        import loadable from '@loadable/component';
        const Component = loadable(() => import('.'));
      `,
    },
    {
      code: `
        import loadable from '@loadable/component';
        loadable(() => import('.'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        const OtherComponent = loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        export default loadable(() => import('./OtherComponent'));
      `,
    },
    {
      code: `
        import baseLoadable from '@loadable-v2/component';

        const loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        export default loadable(() => import('./OtherComponent'));
      `,
      options: [{ importDeclaration: '@loadable-v2/component' }],
    },
  ],
  invalid: [
    {
      code: `
        import Loadable from '@loadable/component';
        export default Loadable(() => import('.'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import Something from '@loadable/component';
        export default Something(() => import('.'));
      `,

      errors: [
        {
          message: printMsg('Something'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import Loadable from '@loadable/component';
        const Component = Loadable(() => import('.'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import Loadable from '@loadable/component';
        Loadable(() => import('.'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function Loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent = Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function Loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function Loadable(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function Loadable(func) {
          function NestedLoadable() {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function Loadable(func) {
          function NestedLoadable() {
            function NestedNestedLoadable() {
              return baseLoadable(func, { fallback: <div>Loading...</div> });
            }
            NestedNestedLoadable();
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent = Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = function(func) {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = function(func) {
          const NestedLoadable = function() {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = function(func) {
          const NestedLoadable = function() {
            const NestedNestedLoadable = function() {
              return baseLoadable(func, { fallback: <div>Loading...</div> });
            }
            NestedNestedLoadable();
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        const OtherComponent =  Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          return baseLoadable(func, { fallback: <div>Loading...</div> });
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          const NestedLoadable = () => {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          const NestedLoadable = () => {
            const NestedNestedLoadable = () => {
              return baseLoadable(func, { fallback: <div>Loading...</div> });
            }

            NestedNestedLoadable();
          }

          NestedLoadable();
        }

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        const OtherComponent = Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => baseLoadable(func, { fallback: <div>Loading...</div> });

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          const NestedLoadable = () => baseLoadable(func, { fallback: <div>Loading...</div> });
          NestedLoadable();
        };

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const Loadable = func => {
          const NestedLoadable = () => {
            const NestedNestedLoadable = () => baseLoadable(func, { fallback: <div>Loading...</div> });
            NestedNestedLoadable();
          }

          NestedLoadable();
        };

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable-v2/component';

        const Loadable = func => {
          const NestedLoadable = () => {
            const NestedNestedLoadable = () => baseLoadable(func, { fallback: <div>Loading...</div> });
            NestedNestedLoadable();
          }

          NestedLoadable();
        };

        export default Loadable(() => import('./OtherComponent'));
      `,

      errors: [
        {
          message: printMsg('Loadable'),
          type: 'CallExpression',
        },
      ],
      options: [{ importDeclaration: '@loadable-v2/component' }],
    },
  ],
});
