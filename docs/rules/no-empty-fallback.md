# no-empty-fallback

A fallback option gives users a visual cue that indicates a loading status, when the component is not "ready" yet. When users see a process taking place, they're likely less to switch to another application or page. Another case is if you need to load component at the bottom of the page fold, the fallback option will prevent page layout shift.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import loadable from '@loadable/component';

const Component = loadable(() => import(`./foo.js`));

function Button() {
  return <Component />;
}
```

OR

```js
import baseLoadable from '@loadable/component';

const loadable = (func) => baseLoadable(func);
const Component = loadable(() => import(`./foo.js`));

function Button() {
  return <Component />;
}
```

Examples of **correct** code for this rule:

```js
import loadable from '@loadable/component';

export default loadable(() => import('./foo'), {
  fallback: <LoadingState />,
});
```

OR

```js
import baseLoadable from '@loadable/component';

const loadable = (func) =>
  baseLoadable(func, {
    fallback: <LoadingState />,
  });

const Component = loadable(() => import(`./foo.js`));

function Button() {
  return <Component />;
}
```

OR

```js
import loadable from '@loadable/component';

const Component = loadable(() => import(`./foo.js`));

function Button() {
  return <Component fallback={() => <LoadingState />} />;
}
```