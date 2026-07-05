const MODIFIER_CODES = new Set([
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "MetaLeft",
  "MetaRight",
  "CapsLock",
  "Fn",
]);

const PRINTABLE_CODES = new Set([
  "Space",
  "Enter",
  "Backspace",
  "Tab",
  "Backquote",
  "Minus",
  "Equal",
  "BracketLeft",
  "BracketRight",
  "Backslash",
  "Semicolon",
  "Quote",
  "Comma",
  "Period",
  "Slash",
]);

export function isTypingKey(code: string): boolean {
  if (MODIFIER_CODES.has(code)) {
    return false;
  }

  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    PRINTABLE_CODES.has(code)
  );
}

export function isKeyCountKey(code: string): boolean {
  return !MODIFIER_CODES.has(code);
}

export function calculateWpm(charCount: number, elapsedMs: number): number {
  if (elapsedMs <= 0 || charCount <= 0) {
    return 0;
  }

  const minutes = elapsedMs / 60_000;
  return Math.round(charCount / 5 / minutes);
}

export function calculateKpm(keyCount: number, elapsedMs: number): number {
  if (elapsedMs <= 0 || keyCount <= 0) {
    return 0;
  }

  const minutes = elapsedMs / 60_000;
  return Math.round(keyCount / minutes);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
