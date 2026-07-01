import { useEffect, useRef } from "react";

type Options = {
  preventDefault?: boolean;
};

export function useHotkey(
  shortcut: string,
  callback: () => void,
  options: Options = {},
) {
  const { preventDefault = true } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const parts = shortcut.toLowerCase().split("+");

    const key = parts.pop();

    const modifiers = new Set(parts);

    function handleKeyDown(event: KeyboardEvent) {
      if (!key) return;

      if (event.key.toLowerCase() !== key) return;

      const modPressed = event.ctrlKey || event.metaKey;

      if (modifiers.has("mod") && !modPressed) return;
      if (modifiers.has("ctrl") && !event.ctrlKey) return;
      if (modifiers.has("meta") && !event.metaKey) return;
      if (modifiers.has("shift") && !event.shiftKey) return;
      if (modifiers.has("alt") && !event.altKey) return;

      if (preventDefault) {
        event.preventDefault();
      }

      callbackRef.current();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcut, preventDefault]);
}
