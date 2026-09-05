import { useCallback, useEffect, useRef, useState } from 'react';
import { SYLLABLES } from '../data/syllables';
import { WORDS } from '../data/words';

export interface UseSpeechReturn {
  say: (text: string, rate?: number) => void;
  isSupported: boolean;
  hasHebrewVoice: boolean;
  isSpeaking: boolean;
}

function clipUrl(path: string) {
  return `${import.meta.env.BASE_URL}audio/${path}.m4a`;
}

function buildClipMap() {
  const map = new Map<string, string>();
  for (const word of WORDS) map.set(word.word, `words/${word.id}`);
  for (const syllable of SYLLABLES) map.set(syllable.text, `syllables/${syllable.id}`);
  return map;
}

const CLIPS = buildClipMap();

export function useSpeech(): UseSpeechReturn {
  const [isSupported] = useState(() => 'speechSynthesis' in window);
  const [hasHebrewVoice, setHasHebrewVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const googleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const fallbackVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const genRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = '';
    audioRef.current = null;
  };

  useEffect(() => {
    if (!isSupported) return;

    const findHebrewVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoices = voices.filter(
        v => v.lang.startsWith('he') || v.lang.startsWith('iw')
      );
      const google = hebrewVoices.find(v => /google/i.test(v.name)) ?? null;
      // Chrome on macOS hangs if you assign Apple's Carmit voice. Prefer
      // Google when it exists; only use a local voice when it's the only option
      // (Cursor's browser, Safari).
      const local = hebrewVoices.find(v => v.localService) ?? null;
      googleVoiceRef.current = google;
      fallbackVoiceRef.current = google ?? local ?? hebrewVoices[0] ?? null;
      setHasHebrewVoice(!!fallbackVoiceRef.current);
    };

    findHebrewVoice();
    window.speechSynthesis.addEventListener('voiceschanged', findHebrewVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', findHebrewVoice);
      clearTimers();
      stopAudio();
    };
  }, [isSupported]);

  const speakNow = useCallback(
    (text: string, rate: number, voice: SpeechSynthesisVoice | null, gen: number) => {
      if (gen !== genRef.current) return;

      const utter = new SpeechSynthesisUtterance(`${text} `);
      utteranceRef.current = utter;
      utter.lang = 'he-IL';
      utter.rate = rate;
      utter.pitch = 1;
      if (voice) utter.voice = voice;

      utter.onstart = () => {
        if (gen === genRef.current) setIsSpeaking(true);
      };
      utter.onend = () => {
        if (gen === genRef.current) setIsSpeaking(false);
      };
      utter.onerror = () => {
        if (gen === genRef.current) setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utter);
      try {
        window.speechSynthesis.resume();
      } catch {
        // ignore
      }
    },
    []
  );

  const playClip = useCallback((path: string, ttsText: string, rate: number, gen: number) => {
    const audio = new Audio(clipUrl(path));
    audioRef.current = audio;
    let fellBack = false;

    const fallback = () => {
      if (fellBack || gen !== genRef.current) return;
      fellBack = true;
      speakNow(ttsText, rate, fallbackVoiceRef.current, gen);
    };

    audio.onended = () => {
      if (gen === genRef.current) setIsSpeaking(false);
    };
    audio.onerror = fallback;
    setIsSpeaking(true);
    audio.play().catch(fallback);
  }, [speakNow]);

  const say = useCallback(
    (text: string, rate = 0.7) => {
      if (!text) return;

      const gen = ++genRef.current;
      clearTimers();
      stopAudio();

      if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
        window.speechSynthesis.cancel();
      }

      const clipPath = CLIPS.get(text);
      if (clipPath) {
        playClip(clipPath, text, rate, gen);
        return;
      }

      if (!isSupported) return;

      const queue = () => speakNow(text, rate, fallbackVoiceRef.current, gen);
      // Same-tick speak() after cancel() is dropped on Chrome/macOS.
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        later(queue, 80);
      } else {
        queue();
      }
    },
    [isSupported, playClip, speakNow]
  );

  const clipCount = useMemo(() => CLIPS.size, []);
  void clipCount;

  return { say, isSupported, hasHebrewVoice, isSpeaking };
}
