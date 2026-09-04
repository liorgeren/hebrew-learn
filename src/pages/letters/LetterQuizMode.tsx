import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BackButton from '../../components/BackButton';
import KidButton from '../../components/KidButton';
import StarBurst from '../../components/StarBurst';
import StarsDisplay from '../../components/StarsDisplay';
import { useProgress } from '../../context/ProgressContext';
import { Letter } from '../../data/letters';
import { useLetterAudio } from '../../hooks/useLetterAudio';

interface LetterQuizModeProps {
  letters: Letter[];
  allLetters: Letter[];
  lessonId: string;
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const ROUNDS = 6;

export default function LetterQuizMode({
  letters,
  allLetters,
  lessonId,
  onBack,
}: LetterQuizModeProps) {
  const { play } = useLetterAudio();
  const { completeLesson } = useProgress();

  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shakingId, setShakingId] = useState<string | null>(null);

  const questions = useRef<Array<{ target: Letter; choices: Letter[] }>>([]);

  useEffect(() => {
    // Build quiz questions
    const pool = shuffle(letters);
    const qs = Array.from({ length: ROUNDS }, (_, i) => {
      const target = pool[i % pool.length];
      const distractors = shuffle(allLetters.filter(l => l.id !== target.id)).slice(0, 3);
      return { target, choices: shuffle([target, ...distractors]) };
    });
    questions.current = qs;
  }, []);

  const currentQ = questions.current[round];

  const handleChoice = (letter: Letter) => {
    if (chosen) return;
    setChosen(letter.id);

    if (letter.id === currentQ.target.id) {
      setCorrect(c => c + 1);
      setShowBurst(true);
    } else {
      setShakingId(letter.id);
      setTimeout(() => setShakingId(null), 500);
    }

    setTimeout(() => {
      setChosen(null);
      if (round + 1 >= ROUNDS) {
        const stars = correct + (letter.id === currentQ.target.id ? 1 : 0) >= ROUNDS * 0.8 ? 3
          : correct + (letter.id === currentQ.target.id ? 1 : 0) >= ROUNDS * 0.5 ? 2 : 1;
        completeLesson('letters', lessonId, stars);
        setFinished(true);
      } else {
        setRound(r => r + 1);
      }
    }, 1000);
  };

  if (!currentQ) return null;

  if (finished) {
    const stars = correct >= ROUNDS * 0.8 ? 3 : correct >= ROUNDS * 0.5 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">
          {stars === 3 ? '🏆' : stars === 2 ? '🎉' : '😊'}
        </motion.div>
        <h2 className="font-display text-3xl text-orange-800">
          {correct} / {ROUNDS} correct!
        </h2>
        <StarsDisplay stars={stars} size="lg" />
        <KidButton onClick={onBack} color="bg-yellow-400">
          Back to Activities
        </KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-orange-600 text-lg">
            {round + 1} / {ROUNDS}
          </div>
        </div>

        {/* Instruction card — audio + English name only (no Hebrew name) */}
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-3xl p-6 text-center shadow-xl border-4 border-orange-200 mb-6"
        >
          <p className="font-display text-xl text-gray-600 mb-3">Tap the letter:</p>
          <div
            className="font-display text-4xl font-bold text-orange-700 mb-2 cursor-pointer"
            onClick={() => play(currentQ.target)}
          >
            {currentQ.target.nameEn}
          </div>
          <div className="text-3xl mb-3">{currentQ.target.emoji}</div>
          <button
            onClick={() => play(currentQ.target)}
            className="inline-flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-display text-lg px-5 py-2 rounded-full shadow border-2 border-blue-200 no-select"
          >
            🔊 Hear it again
          </button>
        </motion.div>

        {/* Choices grid */}
        <div className="grid grid-cols-2 gap-4">
          {currentQ.choices.map(letter => {
            let state = 'idle';
            if (chosen) {
              if (letter.id === currentQ.target.id) state = 'correct';
              else if (letter.id === chosen) state = 'wrong';
            }

            return (
              <motion.button
                key={letter.id}
                onClick={() => handleChoice(letter)}
                disabled={!!chosen}
                animate={
                  shakingId === letter.id
                    ? { x: [-8, 8, -8, 8, 0] }
                    : state === 'correct'
                    ? { scale: [1, 1.15, 1] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                className={`
                  ${letter.color} rounded-2xl p-4 text-center border-4 shadow-lg
                  min-h-[96px] flex flex-col items-center justify-center
                  transition-all duration-200 no-select
                  ${state === 'correct' ? 'border-green-400 ring-4 ring-green-300' : ''}
                  ${state === 'wrong' ? 'border-red-400 opacity-50' : ''}
                  ${!chosen ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                  ${state === 'idle' ? 'border-white/60' : ''}
                `}
              >
                <span className="hebrew-text text-5xl font-bold">{letter.letter}</span>
                {state !== 'idle' && (
                  <span className="font-display text-sm text-gray-600 mt-1">{letter.nameEn}</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Score */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white/60 rounded-full px-4 py-1 font-display text-orange-700">
            ✅ {correct} correct
          </div>
        </div>
      </div>
    </div>
  );
}
