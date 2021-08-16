# no-full-dynamic-import

It is not recommended using full dynamic import such as `loadable(() => import(foo))` beacause webpack needs hint the module to be imported, and there is no way webpack will statically analyze `foo` in build time. Eventually during runtime, when `foo` is fully recognized, `foo.js`,`foo.json`, etc would be bundled up to your application chunk which can potentially suffer your bundle size.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import Loadable from '@loadable/component';

var filename = 'foo';
export default Loadable(() => import(`./${filename}`));
```

OR

```js
import Loadable from '@loadable/component';

var filename = 'foo';
export default Loadable(() => import(filename));
```

Examples of **correct** code for this rule:

```js
import loadable from '@loadable/component';

export default loadable(() => import('./foo'));
```

OR

```js
import loadable from '@loadable/component';

export default loadable(() => import('./foo.js'));
```

You can also opt the rule using loose mode. When `loose` is set to true, it will allow you to using dynamic expression when using the `webpackInclude` and `webpackExclude` leading comments where adding regex patterns that reduce the number of files that webpack will bundle for this import.

```json
rules: {
  "no-template-curly-in-string": [{ loose: true }],
},
```

```js
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  `./locale/${language}`
);
```
