import { useCallback, useRef, useState } from 'react';
import { Letter } from '../data/letters';
import { useSpeech } from './useSpeech';

const clipUrl = (id: string) => `${import.meta.env.BASE_URL}audio/letters/${id}.m4a`;

/**
 * Plays the recorded clip for a letter, falling back to speech synthesis when
 * the clip is missing or blocked (device TTS quality for Hebrew is poor, so the
 * clips are preferred).
 */
export function useLetterAudio() {
  const { say, isSpeaking } = useSpeech();
  const [isPlayingClip, setIsPlayingClip] = useState(false);
  const currentRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (letter: Letter) => {
      currentRef.current?.pause();
      // Only clear the TTS queue when something is actually in it — calling
      // cancel() on an idle engine repeatedly (once per letter tap) is a
      // known trigger for Chrome/macOS local voices hanging for the rest of
      // the tab session.
      if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
        window.speechSynthesis.cancel();
      }

      const audio = new Audio(clipUrl(letter.id));
      currentRef.current = audio;

      // A missing clip rejects play() *and* fires onerror, so guard against
      // speaking the name twice.
      let fellBack = false;
      const fallback = () => {
        if (fellBack) return;
        fellBack = true;
        setIsPlayingClip(false);
        say(letter.name);
      };

      audio.onended = () => setIsPlayingClip(false);
      audio.onerror = fallback;
      setIsPlayingClip(true);
      audio.play().catch(fallback);
    },
    [say]
  );

  return { play, isPlaying: isPlayingClip || isSpeaking };
}
