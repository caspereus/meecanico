"use client";

import { useCallback, useEffect, useState } from "react";

function getDropdownCloseMs(): number {
  if (typeof window === "undefined") {
    return 150;
  }

  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--dropdown-close-dur"
  );
  return parseFloat(raw) || 150;
}

export function useDropdownTransition() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const visible = mounted || closing;

  useEffect(() => {
    if (!mounted || closing || open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setOpen(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [mounted, closing, open]);

  const openDropdown = useCallback(() => {
    setClosing(false);
    setOpen(false);
    setMounted(true);
  }, []);

  const closeDropdown = useCallback(() => {
    if (!mounted && !open) {
      return;
    }

    setOpen(false);
    setClosing(true);

    window.setTimeout(() => {
      setClosing(false);
      setMounted(false);
    }, getDropdownCloseMs());
  }, [mounted, open]);

  const toggleDropdown = useCallback(() => {
    if (open || mounted) {
      closeDropdown();
      return;
    }

    openDropdown();
  }, [closeDropdown, mounted, open, openDropdown]);

  return {
    open,
    closing,
    visible,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}
