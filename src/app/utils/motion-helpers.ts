/**
 * Utility types and helpers for Motion animations
 */

/**
 * Ensures container has proper positioning for Motion scroll tracking
 * This prevents console warnings about non-static positioning
 */
export function ensureScrollContainer(element: HTMLElement | null) {
  if (!element) return;
  
  const position = window.getComputedStyle(element).position;
  if (position === 'static') {
    element.style.position = 'relative';
  }
}

/**
 * Hook to ensure scroll target has proper positioning
 */
export function useScrollTarget<T extends HTMLElement>(
  ref: React.RefObject<T>
) {
  React.useEffect(() => {
    if (ref.current) {
      ensureScrollContainer(ref.current);
    }
  }, [ref]);
}

import React from 'react';
