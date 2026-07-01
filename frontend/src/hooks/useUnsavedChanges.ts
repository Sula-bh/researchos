import { useCallback, useEffect, useRef, useState } from "react";
import { useBlocker } from "react-router-dom";

export function useUnsavedChanges(isDirty: boolean) {
  const [open, setOpen] = useState(false);

  const ignoreNextNavigation = useRef(false);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (ignoreNextNavigation.current) {
      ignoreNextNavigation.current = false;
      return false;
    }

    if (!isDirty) return false;

    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state === "blocked") {
      setOpen(true);
    }
  }, [blocker.state]);

  const cancel = useCallback(() => {
    setOpen(false);
    blocker.reset?.();
  }, [blocker]);

  const discard = useCallback(() => {
    setOpen(false);
    blocker.proceed?.();
  }, [blocker]);

  const allowNextNavigation = useCallback(() => {
    ignoreNextNavigation.current = true;
  }, []);

  return {
    open,
    cancel,
    discard,
    allowNextNavigation,
  };
}
