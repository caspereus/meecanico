"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { SwitchProfile } from "@/data/switch-profiles";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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
      <span className="text-sm text-muted-foreground">Switches</span>
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
        <span
          className="size-3.5 shrink-0 rounded-sm ring-1 ring-black/10 dark:ring-white/10"
          style={{ backgroundColor: selected.color }}
          aria-hidden
        />
        {selected.name}
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
          className="absolute bottom-full left-[4.5rem] z-20 mb-2 min-w-[220px] overflow-hidden rounded-xl border border-border/60 bg-background p-1 shadow-lg"
        >
          {profiles.map((profile) => (
            <li key={profile.id} role="option" aria-selected={profile.id === selected.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(profile);
                  setOpen(false);
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
  );
}
