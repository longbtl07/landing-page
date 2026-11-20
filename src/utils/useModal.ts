'use client';

import { useEffect, useRef } from 'react';

// Shared across dialogs so closing a nested one does not unlock page scroll early.
let openDialogs = 0;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dialog behaviour shared by every modal/drawer: Escape closes, page scroll locks,
 * focus moves into the dialog, Tab stays inside it, and focus returns to the trigger on close.
 * Attach the returned ref to the dialog panel.
 */
export function useModal<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const panel = ref.current;

    openDialogs += 1;
    document.body.style.overflow = 'hidden';
    (panel?.querySelector<HTMLElement>(FOCUSABLE) ?? panel)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      openDialogs -= 1;
      if (openDialogs === 0) document.body.style.overflow = '';
      trigger?.focus?.();
    };
  }, [isOpen]);

  return ref;
}
