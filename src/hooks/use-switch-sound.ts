"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  SOUND_DEFINES_DOWN,
  SOUND_DEFINES_UP,
} from "@/components/ui/keyboard";
import type { SwitchProfile } from "@/data/switch-profiles";

const SOUND_URL = "/sounds/sound.ogg";

export function useSwitchSound(profile: SwitchProfile, enabled = true) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const profileRef = useRef(profile);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    if (!enabled) {
      audioBufferRef.current = null;
      return;
    }

    let cancelled = false;

    const initAudio = async () => {
      try {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const response = await fetch(SOUND_URL);
        if (!response.ok) {
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        if (!cancelled) {
          audioBufferRef.current = audioBuffer;
        }
      } catch {
        // Sound is optional — keep the keyboard interactive if loading fails.
      }
    };

    void initAudio();

    return () => {
      cancelled = true;
      audioBufferRef.current = null;

      const context = audioContextRef.current;
      audioContextRef.current = null;
      void context?.close();
    };
  }, [enabled]);

  const playSound = useCallback(
    (phase: "down" | "up", keyCode: string) => {
      if (!enabled) {
        return;
      }

      const audioContext = audioContextRef.current;
      const audioBuffer = audioBufferRef.current;
      if (!audioContext || !audioBuffer) {
        return;
      }

      const soundDef =
        phase === "down"
          ? SOUND_DEFINES_DOWN[keyCode]
          : SOUND_DEFINES_UP[keyCode];
      if (!soundDef) {
        return;
      }

      const [startMs, durationMs] = soundDef;
      const { playbackRate, volume, detune = 0 } = profileRef.current.sound;

      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = audioBuffer;
      source.playbackRate.value = playbackRate;
      source.detune.value = detune;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(0, startMs / 1000, durationMs / 1000);
    },
    [enabled]
  );

  return { playSound };
}
