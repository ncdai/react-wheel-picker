// This code comes from https://github.com/fuma-nama/fumadocs/blob/dev/packages/core/src/utils/use-effect-event.ts

"use client";

import { useCallback, useRef } from "react";

export function useEffectEvent<F extends (...params: never[]) => unknown>(
  callback: F,
): F {
  const ref = useRef(callback);
  ref.current = callback;

  return useCallback(((...params) => ref.current(...params)) as F, []);
}
