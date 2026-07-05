"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import {
  KEYBOARD_THEME_OPTIONS,
  type KeyboardThemeName,
  type KeyboardThemeOption,
} from "@/components/ui/keyboard";
import { useDropdownTransition } from "@/hooks/use-dropdown-transition";
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
  const { open, closing, visible, toggleDropdown, closeDropdown } =
    useDropdownTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    KEYBOARD_THEME_OPTIONS.find((theme) => theme.id === selected) ??
    KEYBOARD_THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  return (
    <div ref={rootRef} className="flex items-center gap-2 sm:gap-3">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        Theme
      </span>
      <div className="relative min-w-0">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggleDropdown}
          className={cn(
            "inline-flex h-9 max-w-full items-center gap-2 rounded-full border border-border/60 bg-background px-3 text-sm font-medium",
            "transition-colors hover:bg-muted/50 active:scale-[0.98]"
          )}
        >
          <ThemeSwatch colors={selectedOption.colors} />
          <span className="truncate">{selectedOption.name}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-150",
              open && "rotate-180"
            )}
          />
        </button>

        {visible ? (
          <ul
            role="listbox"
            data-origin="bottom-left"
            className={cn(
              "t-dropdown absolute bottom-full left-0 z-20 mb-2 max-h-[min(280px,50vh)] min-w-[180px] overflow-y-auto rounded-xl border border-border/60 bg-background p-1 shadow-lg",
              open && "is-open",
              closing && "is-closing"
            )}
          >
          {KEYBOARD_THEME_OPTIONS.map((theme) => (
            <li key={theme.id} role="option" aria-selected={theme.id === selected}>
              <button
                type="button"
                onClick={() => {
                  onSelect(theme.id);
                  closeDropdown();
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
    </div>
  );
}
