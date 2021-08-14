import noOtehrLoadableIdentifier from './rules/no-other-loadable-identifier';
import noFullDynamicImport from './rules/no-full-dynamic-import';
import noEmptyFallback from './rules/no-empty-fallback';

export = {
  rules: {
    'no-other-loadable-identifier': noOtehrLoadableIdentifier,
    'no-full-dynamic-import': noFullDynamicImport,
    'no-empty-fallback': noEmptyFallback,
  },
};
