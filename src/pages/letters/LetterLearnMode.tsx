import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import BackButton from '../../components/BackButton';
import KidButton from '../../components/KidButton';
import SpeakButton from '../../components/SpeakButton';
import { useProgress } from '../../context/ProgressContext';
import { Letter } from '../../data/letters';
import { useLetterAudio } from '../../hooks/useLetterAudio';

interface LetterLearnModeProps {
  letters: Letter[];
  lessonId: string;
  onBack: () => void;
}

type Phase = 'single' | 'all' | 'done';

export default function LetterLearnMode({ letters, lessonId, onBack }: LetterLearnModeProps) {
  const shuffled = useMemo(() => [...letters].sort(() => Math.random() - 0.5), [letters]);
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState<Phase>('single');
  const { play, isPlaying } = useLetterAudio();
  const { completeLesson } = useProgress();

  const current = shuffled[idx];
  const totalSteps = shuffled.length + 1; // individual letters + all-together stop
  const stepLabel = phase === 'all' ? totalSteps : idx + 1;

  const next = () => {
    if (idx < shuffled.length - 1) {
      setDirection(1);
      setIdx(i => i + 1);
    } else {
      // After last individual letter → all-letters-together stop
      setDirection(1);
      setPhase('all');
    }
  };

  const prev = () => {
    if (idx > 0) {
      setDirection(-1);
      setIdx(i => i - 1);
    }
  };

  const finishAllTogether = () => {
    completeLesson('letters', lessonId, 1);
    setPhase('done');
  };

  if (phase === 'done') {
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
        <p className="font-display text-lg text-orange-600">You learned all {shuffled.length} letters!</p>
        <KidButton onClick={onBack} color="bg-yellow-400">
          Back to Activities
        </KidButton>
      </div>
    );
  }

  // All letters together review stop
  if (phase === 'all') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <BackButton onClick={() => { setPhase('single'); setIdx(shuffled.length - 1); }} />
            <div className="font-display text-orange-600">
              {stepLabel} / {totalSteps}
            </div>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < totalSteps ? 'w-4 h-4 bg-orange-400' : 'w-3 h-3 bg-orange-200'
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 rounded-3xl p-6 text-center shadow-2xl border-4 border-orange-200 mb-6"
          >
            <h2 className="font-display text-2xl text-orange-800 mb-1">All together!</h2>
            <p className="font-display text-base text-orange-600 mb-5">
              Tap any letter to hear it
            </p>

            <div
              className={`flex flex-wrap gap-2 justify-center ${shuffled.length > 8 ? 'max-h-72 overflow-y-auto' : ''}`}
              dir="rtl"
            >
              {shuffled.map((letter, i) => (
                <motion.button
                  key={letter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.6) }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => play(letter)}
                  className={`
                    ${letter.color} rounded-2xl flex flex-col items-center justify-center
                    border-4 border-white/60 shadow-lg no-select cursor-pointer
                    hover:scale-105 transition-transform
                    ${shuffled.length > 8 ? 'w-14 h-16' : 'w-20 h-24'}
                  `}
                >
                  <span className={`hebrew-text font-bold text-gray-800 leading-none ${shuffled.length > 8 ? 'text-2xl' : 'text-4xl'}`}>
                    {letter.letter}
                  </span>
                  {shuffled.length <= 8 && (
                    <span className="font-display text-xs text-gray-600 mt-1">{letter.nameEn}</span>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <SpeakButton
                onClick={() => {
                  // Speak all letter names in sequence
                  shuffled.forEach((l, i) => {
                    setTimeout(() => play(l), i * 900);
                  });
                }}
                isSpeaking={isPlaying}
                size="md"
              />
            </div>
          </motion.div>

          <div className="flex gap-4">
            <KidButton
              onClick={() => { setPhase('single'); setIdx(shuffled.length - 1); }}
              color="bg-white"
              className="flex-1"
            >
              ← Prev
            </KidButton>
            <KidButton onClick={finishAllTogether} color="bg-orange-400" className="flex-1">
              🎉 Done!
            </KidButton>
          </div>
        </div>
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
            {stepLabel} / {totalSteps}
          </div>
        </div>

        {/* Swipe hint */}
        <p className="text-center font-display text-sm text-orange-400 mb-2 opacity-70">
          👈 swipe to navigate 👉
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
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

            {/* Speak button */}
            <div className="flex justify-center mt-4">
              <SpeakButton
                onClick={() => play(current)}
                isSpeaking={isPlaying}
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
            {idx === shuffled.length - 1 ? 'All Together →' : 'Next →'}
          </KidButton>
        </div>
      </div>
    </div>
  );
}
