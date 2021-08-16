# eslint-plugin-loadable-component

> Unofficial lint support for @loadable/component.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-loadable-component`:

```bash
npm install eslint-plugin-loadable-component --save-dev
```

Or, with yarn:

```bash
yarn add -D eslint-plugin-loadable-component
```

## Usage
> Node: This plugin doesn't have "recommended" rule set at the moment. We are currently still considering of the right rules to be the recommended default set. Pleae make sure to enable rules based on your needs. 

To get started, add `loadable-component` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "loadable-component"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "loadable-component/no-empty-fallback": "warn",
        "loadable-component/no-full-dynamic-import": "error",
        "loadable-component/no-other-loadable-identifier": "error",
    }
}
```

## Rules

| Name                       | Type             | Docs                                               |
| -------------------------- |:-------------:   | -----:                                             |
| no-empty-fallback          | Recommendation   | [Link](./docs/rules/no-empty-fallback.md)          |
| no-full-dynamic-import     | Recommendation   | [Link](./docs/rules/no-full-dynamic-import.md)     |
| no-other-loadable-idenfier | Possible Error   | [Link](./docs/rules/no-other-loadable-idenfier.md) |

## Disabling Rule
You can disable certain rule by using ESLint directive syntax (marked with #) to hint ESLint to disable in specific line or entire file. You can find a list of ESLint directives [here](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments).

```js
# eslint-disable-next-line #no-empty-fallback
loadable(() => import('./foo.js'));
```

## License

[MIT](./LICENSE)