export const TYPING_PHRASES = [
  "meecanico hears keys not words type anywhere on your mac with thocky switch sounds",
  "pick holy panda or mx blue and feel every keystroke with spatial three d audio",
  "menu bar control global hotkeys and a floating wpm hud built for mac typists",
  "privacy first key codes only never typed text no network no analytics no cloud",
  "download drag to applications grant input monitoring and start typing in any app",
  "nineteen switch profiles from cherry kailh topre and more one menu bar icon",
];

export const DEFAULT_TYPING_PHRASE = TYPING_PHRASES[0];

export function randomTypingPhrase(): string {
  return TYPING_PHRASES[Math.floor(Math.random() * TYPING_PHRASES.length)];
}

export type CharState = "pending" | "correct" | "incorrect";

const LETTER_CODES: Record<string, [string, string]> = {
  KeyA: ["a", "A"],
  KeyB: ["b", "B"],
  KeyC: ["c", "C"],
  KeyD: ["d", "D"],
  KeyE: ["e", "E"],
  KeyF: ["f", "F"],
  KeyG: ["g", "G"],
  KeyH: ["h", "H"],
  KeyI: ["i", "I"],
  KeyJ: ["j", "J"],
  KeyK: ["k", "K"],
  KeyL: ["l", "L"],
  KeyM: ["m", "M"],
  KeyN: ["n", "N"],
  KeyO: ["o", "O"],
  KeyP: ["p", "P"],
  KeyQ: ["q", "Q"],
  KeyR: ["r", "R"],
  KeyS: ["s", "S"],
  KeyT: ["t", "T"],
  KeyU: ["u", "U"],
  KeyV: ["v", "V"],
  KeyW: ["w", "W"],
  KeyX: ["x", "X"],
  KeyY: ["y", "Y"],
  KeyZ: ["z", "Z"],
};

export function codeToChar(code: string, shift: boolean): string | null {
  if (code === "Space") {
    return " ";
  }

  const letters = LETTER_CODES[code];
  if (letters) {
    return shift ? letters[1] : letters[0];
  }

  return null;
}

export function calculateAccuracy(
  correctChars: number,
  incorrectChars: number
): number {
  const total = correctChars + incorrectChars;
  if (total === 0) {
    return 100;
  }

  return Math.round((correctChars / total) * 100);
}

export function calculateWpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0 || correctChars <= 0) {
    return 0;
  }

  const minutes = elapsedMs / 60_000;
  return Math.round(correctChars / 5 / minutes);
}

export const TYPING_TEST_DURATION_SEC = 15;
