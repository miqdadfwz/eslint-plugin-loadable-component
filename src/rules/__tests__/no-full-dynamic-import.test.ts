import { RuleTester } from 'eslint';
import rule from '../no-full-dynamic-import';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { ecmaVersion: 2018, sourceType: 'script' },
});

const message = 'Dynamic expression for the import() argument is not recommended. Use static string literal instead.';

ruleTester.run('no-full-dynamic-import', rule, {
  valid: [
    {
      code: `
              import(/* webpackChunkName: "find" */ './index')
            `,
      options: [{ loose: false }],
    },
    {
      code: `
              import(/* webpackChunkName: "find" */ './index')
            `,
      options: [{ loose: true }],
    },
    {
      code: 'var path = "index"; import(/* webpackInclude: /index/ */ `${path}`)',
      options: [{ loose: true }],
    },
    {
      code: 'var path = "index"; import(/* webpackExclude: /index/ */ `${path}`)',
      options: [{ loose: true }],
    },
  ],
  invalid: [
    {
      code: `
              var path = 'index';
              import(/* webpackChunkName: "find" */ path)
            `,
      options: [{ loose: false }],
      errors: [
        {
          message: message,
          type: 'Identifier',
        },
      ],
    },
    {
      code: `
              var path = 'index';
              import(/* webpackChunkName: "find" */ path)
            `,
      options: [{ loose: true }],
      errors: [
        {
          message: message,
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'var path = "index"; import(`./${path}`)',
      options: [{ loose: false }],
      errors: [
        {
          message: message,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: 'var path = "index"; import(`./${path}`)',
      options: [{ loose: true }],
      errors: [
        {
          message: message,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: 'var path = "index"; import(/* webpackExclude: /index/ */ `${path}`)',
      options: [{ loose: false }],
      errors: [
        {
          message: message,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: 'var path = "index"; import(/* webpackInclude: /index/ */ `${path}`)',
      options: [{ loose: false }],
      errors: [
        {
          message: message,
          type: 'TemplateLiteral',
        },
      ],
    },
  ],
});
