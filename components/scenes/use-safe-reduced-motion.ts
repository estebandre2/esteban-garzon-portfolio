"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Reduced-motion preference that matches the server on the first (hydration) render and only
 * switches after mount, so SSR markup and the first client render never disagree.
 * CSS @media (prefers-reduced-motion) keeps that first paint static.
 */
export function useSafeReducedMotion(): boolean {
  const prefers = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && prefers;
}
