# no-other-loadable-identifier

`@loadable/babel-plugin` only transform the code based on the restrictive `loadable` keyword when importing the module from `@loadable/component` as default module. For more information about the limitation, you can check the implementation details coming from its [source code](https://github.com/gregberge/loadable-components/blob/89cf124f9079395f2d77038033e472b22c04deb6/packages/babel-plugin/src/index.js#L37-L49) or the [full documentation](https://loadable-components.com/docs/babel-plugin/#loadable-detection).

This code **will not** be transformed by the babel plugin:

```js
import load from '@loadable/component';
const OtherComponent = load(() => import('./OtherComponent'));
```

The load function is not detected, you have to name it "loadable".

```js
import loadable from '@loadable/component';
const OtherComponent = loadable(() => import('./OtherComponent'));
```

## Rule Details

The purpose of this rule is to prevent you with this kind of trivial error. It will give you an error message along with a suggestion if you don't use "loadable" keyword.

Examples of **incorrect** code for this rule (notice it comes with capital "L" in the module name):

```js
import Loadable from '@loadable/component';

export default Loadable(() => import('./OtherComponent'));
```

Examples of **correct** code for this rule:

```js
import loadable from '@loadable/component';

export default loadable(() => import('./OtherComponent'));
```
