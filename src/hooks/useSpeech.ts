import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseSpeechReturn {
  say: (text: string, rate?: number) => void;
  isSupported: boolean;
  hasHebrewVoice: boolean;
  isSpeaking: boolean;
}

export function useSpeech(): UseSpeechReturn {
  const [isSupported] = useState(() => 'speechSynthesis' in window);
  const [hasHebrewVoice, setHasHebrewVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hebrewVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    const findHebrewVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoices = voices.filter(
        v => v.lang.startsWith('he') || v.lang.startsWith('iw')
      );
      // Prefer a Google network voice — noticeably better stress/prosody than
      // the local OS voice (e.g. macOS "Carmit").
      const best =
        hebrewVoices.find(v => v.name.includes('Google')) ?? hebrewVoices[0];
      if (best) {
        hebrewVoiceRef.current = best;
        setHasHebrewVoice(true);
      } else {
        setHasHebrewVoice(false);
      }
    };

    findHebrewVoice();
    window.speechSynthesis.addEventListener('voiceschanged', findHebrewVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', findHebrewVoice);
    };
  }, [isSupported]);

  const say = useCallback(
    (text: string, rate = 0.7) => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'he-IL';
      utter.rate = rate;
      utter.pitch = 1.2;
      if (hebrewVoiceRef.current) {
        utter.voice = hebrewVoiceRef.current;
      }
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utter);
    },
    [isSupported]
  );

  return { say, isSupported, hasHebrewVoice, isSpeaking };
}
