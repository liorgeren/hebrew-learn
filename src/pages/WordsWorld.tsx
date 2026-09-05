import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import KidButton from '../components/KidButton';
import SpeakButton from '../components/SpeakButton';
import StarBurst from '../components/StarBurst';
import StarsDisplay from '../components/StarsDisplay';
import { useProgress } from '../context/ProgressContext';
import { Word, WORDS, pickStageWords, shuffleList } from '../data/words';
import { useSpeech } from '../hooks/useSpeech';

interface WordsWorldProps {
  onBack: () => void;
}

type Mode = 'menu' | 'soundItOut' | 'pictureMatch';

export default function WordsWorld({ onBack }: WordsWorldProps) {
  const [mode, setMode] = useState<Mode>('menu');
  const { getLessonStars } = useProgress();

  if (mode === 'soundItOut') return <SoundItOut onBack={() => setMode('menu')} />;
  if (mode === 'pictureMatch') return <PictureMatch onBack={() => setMode('menu')} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <BackButton onClick={onBack} />
          <div>
            <h1 className="font-display text-3xl text-rose-800">Read Words!</h1>
            <p className="font-display text-base text-rose-600">Real Hebrew words 📚</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ActivityCard
            emoji="🔊"
            title="Sound It Out"
            subtitle="See it, hear it, say it!"
            color="bg-pink-300"
            onClick={() => setMode('soundItOut')}
            stars={getLessonStars('words', 'soundItOut')}
          />
          <ActivityCard
            emoji="🖼️"
            title="Picture Match"
            subtitle="Match the word to its picture!"
            color="bg-rose-300"
            onClick={() => setMode('pictureMatch')}
            stars={getLessonStars('words', 'pictureMatch')}
          />
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ emoji, title, subtitle, color, onClick, stars }: {
  emoji: string; title: string; subtitle: string;
  color: string; onClick: () => void; stars: number;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${color} rounded-2xl p-5 border-4 border-white/50 shadow-lg cursor-pointer flex items-center gap-4`}
    >
      <div className="text-4xl">{emoji}</div>
      <div className="flex-1">
        <div className="font-display text-xl font-bold text-gray-800">{title}</div>
        <div className="font-display text-sm text-gray-600">{subtitle}</div>
        {stars > 0 && <StarsDisplay stars={stars} size="sm" />}
      </div>
      <div className="text-3xl">›</div>
    </motion.div>
  );
}

// ---- Sound It Out ----
function SoundItOut({ onBack }: { onBack: () => void }) {
  const { say, isSpeaking } = useSpeech();
  const { completeLesson } = useProgress();
  const [idx, setIdx] = useState(0);
  const [, setDirection] = useState(1);
  const [heardFull, setHeardFull] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [words] = useState(() => pickStageWords());
  const word = words[idx];

  const hearFullWord = () => {
    say(word.word, 0.6);
    setHeardFull(true);
    setShowBurst(true);
  };

  const next = () => {
    if (idx < words.length - 1) {
      setDirection(1);
      setIdx(i => i + 1);
      setHeardFull(false);
    } else {
      completeLesson('words', 'soundItOut', 2);
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">🏆</motion.div>
        <h2 className="font-display text-3xl text-rose-800">Amazing Reader!</h2>
        <KidButton onClick={onBack} color="bg-pink-400">Back</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-rose-600">{idx + 1} / {words.length}</div>
        </div>

        {/* Word card */}
        <motion.div
          key={word.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${word.color} rounded-3xl p-6 text-center shadow-2xl border-4 border-white/60 mb-6`}
        >
          {/* Full word */}
          <div className="hebrew-text text-6xl font-bold text-gray-800 mb-2">{word.word}</div>
          <div className="text-6xl mb-2">{word.emoji}</div>
          <div className="font-display text-2xl text-gray-600">{word.translation}</div>
        </motion.div>

        {/* Hear full word */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <SpeakButton onClick={hearFullWord} isSpeaking={isSpeaking} size="lg" />
        </div>

        {/* Next button */}
        {heardFull && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <KidButton onClick={next} color="bg-pink-400" className="w-full">
              {idx === words.length - 1 ? '🏆 Finished!' : 'Next Word →'}
            </KidButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ---- Picture Match ----
function PictureMatch({ onBack }: { onBack: () => void }) {
  const { say } = useSpeech();
  const { completeLesson } = useProgress();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shakingId, setShakingId] = useState<string | null>(null);

  const [questions] = useState(() => {
    const pool = pickStageWords();
    return pool.map(target => {
      const others = shuffleList(WORDS.filter(w => w.id !== target.id)).slice(0, 2);
      return { target, choices: shuffleList([target, ...others]) };
    });
  });
  const ROUNDS = questions.length;
  const q = questions[round];

  useEffect(() => {
    if (q) setTimeout(() => say(q.target.word, 0.6), 300);
  }, [round]);

  const handleChoice = (w: Word) => {
    if (chosen) return;
    setChosen(w.id);
    const isCorrect = w.id === q.target.id;
    if (isCorrect) {
      setCorrect(c => c + 1);
      setShowBurst(true);
    } else {
      setShakingId(w.id);
      setTimeout(() => setShakingId(null), 500);
    }
    setTimeout(() => {
      setChosen(null);
      if (round + 1 >= ROUNDS) {
        const c2 = correct + (isCorrect ? 1 : 0);
        completeLesson('words', 'pictureMatch', c2 >= ROUNDS * 0.8 ? 3 : c2 >= ROUNDS * 0.5 ? 2 : 1);
        setFinished(true);
      } else {
        setRound(r => r + 1);
      }
    }, 1100);
  };

  if (!q) return null;

  if (finished) {
    const stars = correct >= ROUNDS * 0.8 ? 3 : correct >= ROUNDS * 0.5 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">{stars === 3 ? '🏆' : '🎉'}</motion.div>
        <h2 className="font-display text-3xl text-rose-800">{correct}/{ROUNDS} correct!</h2>
        <StarsDisplay stars={stars} size="lg" />
        <KidButton onClick={onBack} color="bg-pink-400">Back</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-rose-600">{round + 1} / {ROUNDS}</div>
        </div>

        {/* Target image */}
        <motion.div
          key={round}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 rounded-3xl p-6 text-center shadow-xl border-4 border-rose-200 mb-6"
        >
          <div className="text-8xl mb-3">{q.target.emoji}</div>
          <p className="font-display text-xl text-gray-600">Which word says</p>
          <div
            className="font-display text-2xl font-bold text-rose-700 cursor-pointer"
            onClick={() => say(q.target.word, 0.6)}
          >
            "{q.target.translation}"?
          </div>
        </motion.div>

        {/* Word choices */}
        <div className="flex flex-col gap-3">
          {q.choices.map(w => {
            let state = 'idle';
            if (chosen) {
              if (w.id === q.target.id) state = 'correct';
              else if (w.id === chosen) state = 'wrong';
            }
            return (
              <motion.button
                key={w.id}
                onClick={() => handleChoice(w)}
                disabled={!!chosen}
                animate={
                  shakingId === w.id ? { x: [-8, 8, -8, 8, 0] }
                    : state === 'correct' ? { scale: [1, 1.06, 1] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                className={`
                  ${w.color} rounded-2xl p-4 border-4 shadow-lg
                  flex items-center gap-4 no-select
                  ${state === 'correct' ? 'border-green-400 ring-4 ring-green-300' : ''}
                  ${state === 'wrong' ? 'border-red-400 opacity-50' : state === 'idle' ? 'border-white/60' : ''}
                  ${!chosen ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <span className="text-3xl">{w.emoji}</span>
                <div className="flex-1 text-right" dir="rtl">
                  <div className="hebrew-text text-3xl font-bold text-gray-800">{w.word}</div>
                  {state !== 'idle' && (
                    <div className="font-display text-sm text-gray-600">{w.translation}</div>
                  )}
                </div>
                {state === 'correct' && <span className="text-2xl">✅</span>}
                {state === 'wrong' && <span className="text-2xl">❌</span>}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="bg-white/60 rounded-full px-4 py-1 font-display text-rose-700">
            ✅ {correct} correct
          </div>
        </div>
      </div>
    </div>
  );
}
