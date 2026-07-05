"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  KEYBOARD_THEME_OPTIONS,
  type KeyboardThemeName,
  type KeyboardThemeOption,
} from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";

type ThemeSelectProps = {
  selected: KeyboardThemeName;
  onSelect: (theme: KeyboardThemeName) => void;
};

function ThemeSwatch({ colors }: { colors: KeyboardThemeOption["colors"] }) {
  return (
    <span className="inline-flex shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10 dark:ring-white/10">
      {colors.map((color) => (
        <span
          key={color}
          className="size-2.5 sm:size-3"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function ThemeSelect({ selected, onSelect }: ThemeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    KEYBOARD_THEME_OPTIONS.find((theme) => theme.id === selected) ??
    KEYBOARD_THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Theme</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-background px-3 text-sm font-medium",
          "transition-colors hover:bg-muted/50 active:scale-[0.98]"
        )}
      >
        <ThemeSwatch colors={selectedOption.colors} />
        {selectedOption.name}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute bottom-full left-[3.75rem] z-20 mb-2 min-w-[180px] overflow-hidden rounded-xl border border-border/60 bg-background p-1 shadow-lg"
        >
          {KEYBOARD_THEME_OPTIONS.map((theme) => (
            <li key={theme.id} role="option" aria-selected={theme.id === selected}>
              <button
                type="button"
                onClick={() => {
                  onSelect(theme.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                  theme.id === selected && "bg-muted/40 font-medium"
                )}
              >
                <ThemeSwatch colors={theme.colors} />
                <span className="min-w-0 flex-1 truncate">{theme.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
