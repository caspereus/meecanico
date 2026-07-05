"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type AnimatedDigitsProps = {
  value: string;
  className?: string;
};

export function AnimatedDigits({ value, className }: AnimatedDigitsProps) {
  const [animating, setAnimating] = useState(false);
  const chars = value.split("");

  useEffect(() => {
    setAnimating(false);

    const frame = window.requestAnimationFrame(() => {
      void document.body.offsetHeight;
      setAnimating(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className={cn("t-digit-group", animating && "is-animating", className)}>
      {chars.map((char, index) => (
        <span
          key={`${value}-${index}-${char}`}
          className="t-digit"
          data-stagger={
            index === chars.length - 2
              ? "1"
              : index === chars.length - 1
                ? "2"
                : undefined
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
