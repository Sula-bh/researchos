import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export function useUnsavedChanges(isDirty: boolean) {
  const blocker = useBlocker(isDirty);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setOpen(true);
    }
  }, [blocker.state]);

  function cancel() {
    setOpen(false);
    blocker.reset?.();
  }

  function discard() {
    setOpen(false);
    blocker.proceed?.();
  }

  return {
    open,
    cancel,
    discard,
    blocker,
  };
}
