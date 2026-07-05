export type SwitchVibe = "Clicky" | "Thock" | "Linear" | "Hybrid";

export type SwitchSoundConfig = {
  playbackRate: number;
  volume: number;
  detune?: number;
};

export type SwitchProfile = {
  id: string;
  name: string;
  brand: string;
  vibe: SwitchVibe;
  color: string;
  description: string;
  sound: SwitchSoundConfig;
};

export const DEMO_SWITCH_PROFILES: SwitchProfile[] = [
  {
    id: "gateron-brown",
    name: "Gateron Brown",
    brand: "Keychron",
    vibe: "Thock",
    color: "#8B6914",
    description: "Tactile bump with a warm, muted bottom-out.",
    sound: { playbackRate: 0.84, volume: 0.92, detune: -100 },
  },
  {
    id: "mx-blue",
    name: "MX Blue",
    brand: "Cherry",
    vibe: "Clicky",
    color: "#3B82F6",
    description: "Crisp, audible click on every press.",
    sound: { playbackRate: 1.05, volume: 1, detune: 80 },
  },
  {
    id: "holy-panda",
    name: "Holy Panda",
    brand: "C³Equalz",
    vibe: "Thock",
    color: "#E85D04",
    description: "Deep, satisfying thock with a rounded bottom-out.",
    sound: { playbackRate: 0.82, volume: 0.95, detune: -120 },
  },
  {
    id: "mx-red",
    name: "MX Red",
    brand: "Cherry",
    vibe: "Linear",
    color: "#EF4444",
    description: "Smooth and quiet — no bump, no click.",
    sound: { playbackRate: 0.94, volume: 0.72, detune: -40 },
  },
  {
    id: "topre-purple",
    name: "Topre Purple Hybrid",
    brand: "Topre",
    vibe: "Hybrid",
    color: "#8B5CF6",
    description: "Rubber-dome smoothness with a subtle tactile bump.",
    sound: { playbackRate: 0.78, volume: 0.85, detune: -200 },
  },
  {
    id: "box-jade",
    name: "Box Jade",
    brand: "Kailh",
    vibe: "Clicky",
    color: "#10B981",
    description: "Sharp, high-pitched click with a stiff press.",
    sound: { playbackRate: 1.12, volume: 1, detune: 150 },
  },
  {
    id: "typewriter",
    name: "Typewriter",
    brand: "NovelKeys",
    vibe: "Thock",
    color: "#D97706",
    description: "Vintage cream switch — clacky and nostalgic.",
    sound: { playbackRate: 0.7, volume: 0.9, detune: -80 },
  },
];

export const DEFAULT_SWITCH_PROFILE = DEMO_SWITCH_PROFILES[0];
