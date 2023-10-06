// Inspired from reach-ui: https://github.com/reach/reach-ui/blob/develop/packages/utils/src/use-force-update.ts
import React from 'react';

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 * @returns {() => void}
 */
export default function useForceUpdate() {
  const [, rerender] = React.useState({});
  return React.useCallback(() => rerender({}), []);
}
