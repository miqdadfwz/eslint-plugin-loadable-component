# eslint-plugin-loadable-component

> Optimize regex literals

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-loadable-component`:

```
npm install eslint-plugin-loadable-component --save-dev
```

## Usage

Add `loadable-component` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

## License

[MIT](./LICENSE)