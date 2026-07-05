export const TYPING_PHRASES = [
  "type on your mac and hear every key with a clean low delay sound",
  "open mail or slack and type like you are on a real keyboard",
  "pick a sound from the menu bar and start typing in any app",
  "every key press plays a soft sound through your headphones or speakers",
  "grant access once then type in safari notes mail and every other app",
  "try a few switch sounds preview each one and pick your favorite today",
  "the quick brown fox jumps over the lazy dog near the old stone wall",
  "a good cup of coffee and a quiet room make typing feel easy and calm",
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

export const TYPING_TEST_DURATION_SEC = 30;
