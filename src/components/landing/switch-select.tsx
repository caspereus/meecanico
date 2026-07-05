"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import type { SwitchProfile } from "@/data/switch-profiles";
import { useDropdownTransition } from "@/hooks/use-dropdown-transition";
import { cn } from "@/lib/utils";

type SwitchSelectProps = {
  profiles: SwitchProfile[];
  selected: SwitchProfile;
  onSelect: (profile: SwitchProfile) => void;
};

export function SwitchSelect({
  profiles,
  selected,
  onSelect,
}: SwitchSelectProps) {
  const { open, closing, visible, toggleDropdown, closeDropdown } =
    useDropdownTransition();
  const rootRef = useRef<HTMLDivElement>(null);

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
        Switches
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
          <span
            className="size-3.5 shrink-0 rounded-sm ring-1 ring-black/10 dark:ring-white/10"
            style={{ backgroundColor: selected.color }}
            aria-hidden
          />
          <span className="truncate">{selected.name}</span>
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
              "t-dropdown absolute bottom-full left-0 z-20 mb-2 max-h-[min(280px,50vh)] min-w-[220px] overflow-y-auto rounded-xl border border-border/60 bg-background p-1 shadow-lg",
              open && "is-open",
              closing && "is-closing"
            )}
          >
          {profiles.map((profile) => (
            <li key={profile.id} role="option" aria-selected={profile.id === selected.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(profile);
                  closeDropdown();
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                  profile.id === selected.id && "bg-muted/40 font-medium"
                )}
              >
                <span
                  className="size-3.5 shrink-0 rounded-sm ring-1 ring-black/10 dark:ring-white/10"
                  style={{ backgroundColor: profile.color }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{profile.name}</span>
                <span className="text-xs text-muted-foreground">{profile.brand}</span>
              </button>
            </li>
          ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
