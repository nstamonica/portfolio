import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const getServerSnapshot = () => true;

/** True on Apple platforms — used to show ⌘K vs Ctrl K. Client components only. */
export function useIsApple() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
