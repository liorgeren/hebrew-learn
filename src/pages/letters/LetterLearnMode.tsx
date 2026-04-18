import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import KidButton from '../../components/KidButton';
import SpeakButton from '../../components/SpeakButton';
import { useProgress } from '../../context/ProgressContext';
import { Letter } from '../../data/letters';
import { useSpeech } from '../../hooks/useSpeech';

interface LetterLearnModeProps {
  letters: Letter[];
  groupNum: number;
  onBack: () => void;
}

export default function LetterLearnMode({ letters, groupNum, onBack }: LetterLearnModeProps) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const { say, isSpeaking } = useSpeech();
  const { completeLesson } = useProgress();
  const [completed, setCompleted] = useState(false);

  const current = letters[idx];

  useEffect(() => {
    // Auto-speak when letter changes
    const t = setTimeout(() => say(current.name), 400);
    return () => clearTimeout(t);
  }, [idx]);

  const next = () => {
    if (idx < letters.length - 1) {
      setDirection(1);
      setIdx(i => i + 1);
    } else {
      completeLesson('letters', `group-${groupNum}`, 1);
      setCompleted(true);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setDirection(-1);
      setIdx(i => i - 1);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-8xl"
        >
          🎉
        </motion.div>
        <h2 className="font-display text-3xl text-orange-800">Great job!</h2>
        <p className="font-display text-lg text-orange-600">You learned all {letters.length} letters!</p>
        <KidButton onClick={onBack} color="bg-yellow-400">
          Back to Activities
        </KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-orange-600">
            {idx + 1} / {letters.length}
          </div>
        </div>

        {/* Swipe hint */}
        <p className="text-center font-display text-sm text-orange-400 mb-2 opacity-70">
          👈 swipe to navigate 👉
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center mb-4">
          {letters.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i <= idx ? 'w-4 h-4 bg-orange-400' : 'w-3 h-3 bg-orange-200'
              }`}
            />
          ))}
        </div>

        {/* Letter card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60 && idx > 0) { setDirection(-1); setIdx(i => i - 1); }
            }}
            variants={{
              enter: (d: number) => ({ x: d * 200, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -200, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`${current.color} rounded-3xl p-8 text-center shadow-2xl border-4 border-white/60 mb-6 cursor-grab active:cursor-grabbing`}
          >
            {/* The letter - huge */}
            <motion.div
              className="hebrew-text text-[140px] leading-none font-bold text-gray-800 mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {current.letter}
            </motion.div>

            {/* Emoji */}
            <div className="text-5xl mb-3">{current.emoji}</div>

            {/* Name */}
            <div className="hebrew-text text-2xl font-bold text-gray-700 mb-1">{current.name}</div>
            <div className="font-display text-xl text-gray-600">{current.nameEn}</div>
            {current.sound && (
              <div className="font-display text-base text-gray-500 mt-1">
                sounds like: <strong>"{current.sound}"</strong>
              </div>
            )}

            {/* Speak button */}
            <div className="flex justify-center mt-4">
              <SpeakButton
                onClick={() => say(current.name)}
                isSpeaking={isSpeaking}
                size="lg"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 justify-between items-center">
          <KidButton
            onClick={prev}
            disabled={idx === 0}
            color="bg-white"
            size="md"
            className="flex-1"
          >
            ← Prev
          </KidButton>
          <KidButton
            onClick={next}
            color="bg-orange-400"
            size="md"
            className="flex-1"
          >
            {idx === letters.length - 1 ? '🎉 Done!' : 'Next →'}
          </KidButton>
        </div>
      </div>
    </div>
  );
}
