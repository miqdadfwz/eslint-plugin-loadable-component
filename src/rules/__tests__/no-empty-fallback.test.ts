import { RuleTester } from 'eslint';
import rule from '../no-empty-fallback';

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

const message = 'Prefer to render fallback in place of the component that not "ready" yet.';

ruleTester.run('no-full-dynamic-import', rule, {
  valid: [
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'), {
              fallback: <p>Loading...</p>
          });

          function Component() {
              return <OtherComponent />
          }
      `,
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
              return <OtherComponent fallback={() => <p>Loading</p>} />
          }
      `,
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
              return <OtherComponent fallback={() => <p>Loading</p>} />
          }
      `,
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            otherOption: <p>Loading...</p>
          });

          function Component() {
              return <OtherComponent fallback={() => <p>Loading</p>} />
          }
      `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          function loadable(func) {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          function loadable(func) {
            return baseLoadable(func);
          }

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
            return <OtherComponent fallback={() => <p>Loading...</p>} />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          function loadable(func, options) {
            return baseLoadable(func, options);
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = function(func) {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = function(func) {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent fallback={() => <p>Loading...</p>} />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = function(func, options) {
            return baseLoadable(func, options);
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => {
            return baseLoadable(func, { fallback: <div>Loading...</div> });
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent fallback={() => <p>Loading...</p>} />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => {
            return baseLoadable(func);
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func, options) => {
            return baseLoadable(func, options);
          }

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => baseLoadable(func, { fallback: <div>Loading...</div> })

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => baseLoadable(func, { fallback: <div>Loading...</div> })

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            fallback: <p>Loading...</p>
          });

          function Component() {
            return <OtherComponent fallback={() => <p>Loading...</p>} />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func) => baseLoadable(func, { fallback: <div>Loading...</div> })

          const OtherComponent = loadable(() => import('./OtherComponent'));

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import baseLoadable from '@loadable/component';

          const loadable = (func, options) => baseLoadable(func)

          const OtherComponent = loadable(() => import('./OtherComponent'), { fallback: <div>Loading...</div> });

          function Component() {
            return <OtherComponent />
          }
        `,
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'), { fallback: <div>Loading...</div> });

          export default OtherComponent;
        `,
    },
    {
      code: `
          import loadable from '@loadable/component';

          export const OtherComponent = loadable(() => import('./OtherComponent'), { fallback: <div>Loading...</div> });
        `,
    },
    {
      code: `
          import loadable from '@loadable-v2/component';

          export const OtherComponent = loadable(() => import('./OtherComponent'), { fallback: <div>Loading...</div> });
        `,
      options: [{ importDeclaration: '@loadable-v2/component' }],
    },
  ],
  invalid: [
    {
      code: `
        import loadable from '@loadable/component';

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import loadable from '@loadable/component';

        const OtherComponent = loadable(() => import('./OtherComponent'), {});

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import loadable from '@loadable/component';

        const OtherComponent = loadable(() => import('./OtherComponent'), {
          notFallback: <p>Loading</p>
        });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import loadable from '@loadable/component';

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent notFallback={true} />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import loadable from '@loadable/component';

        const OtherComponent = loadable(() => import('./OtherComponent'), {
          notFallback: true
        });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), {});

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), {
          notFallback: true
        });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        function loadable(func) {
          return baseLoadable(func, { notFallback: true });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent notFallback={true} />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func, {});
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func, { notFallback: true });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func, opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func, opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), {});

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func, opt) {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), { notFallback: true });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = function(func) {
          return baseLoadable(func);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent notFallback={true} />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => {
          return baseLoadable(func);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => {
          return baseLoadable(func, {});
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => {
          return baseLoadable(func, { notFallback: true });
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), {});

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => {
          return baseLoadable(func, opt);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'), { notFallback: true });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => {
          return baseLoadable(func);
        }

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent notFallback={true} />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => baseLoadable(func);

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => baseLoadable(func, {});

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => baseLoadable(func, { notFallback: true });

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => baseLoadable(func, opt);

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => baseLoadable(func, opt);

        const OtherComponent = loadable(() => import('./OtherComponent'), {});

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func, opt) => baseLoadable(func, opt);

        const OtherComponent = loadable(() => import('./OtherComponent'), { notFallback: true });

        function Component() {
            return <OtherComponent />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        import baseLoadable from '@loadable/component';

        const loadable = (func) => baseLoadable(func);

        const OtherComponent = loadable(() => import('./OtherComponent'));

        function Component() {
            return <OtherComponent notFallback={true} />
        }
      `,

      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'));

          export default OtherComponent;
        `,
      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
          import loadable from '@loadable/component';

          const OtherComponent = loadable(() => import('./OtherComponent'), {
            notFallback: true
          });

          export default OtherComponent;
        `,
      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
          import loadable from '@loadable/component';

          export const OtherComponent = loadable(() => import('./OtherComponent'), {
            notFallback: true
          });
        `,
      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
          import loadable from '@loadable/component';

          export const OtherComponent = loadable(() => import('./OtherComponent'));
        `,
      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
          import loadable from '@loadable-v2/component';

          export const OtherComponent = loadable(() => import('./OtherComponent'));
        `,
      errors: [
        {
          message: message,
          type: 'CallExpression',
        },
      ],
      options: [{ importDeclaration: '@loadable-v2/component' }],
    },
  ],
});
