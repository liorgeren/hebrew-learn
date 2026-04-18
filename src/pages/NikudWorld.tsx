import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import KidButton from '../components/KidButton';
import SpeakButton from '../components/SpeakButton';
import StarBurst from '../components/StarBurst';
import StarsDisplay from '../components/StarsDisplay';
import { useProgress } from '../context/ProgressContext';
import { BASIC_NIKUD, Nikud } from '../data/nikud';
import { useSpeech } from '../hooks/useSpeech';

interface NikudWorldProps {
  onBack: () => void;
}

type Mode = 'menu' | 'learn' | 'quiz';

export default function NikudWorld({ onBack }: NikudWorldProps) {
  const [mode, setMode] = useState<Mode>('menu');
  const { getLessonStars } = useProgress();

  if (mode === 'learn') return <NikudLearnMode onBack={() => setMode('menu')} />;
  if (mode === 'quiz') return <NikudQuizMode onBack={() => setMode('menu')} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <BackButton onClick={onBack} />
          <div>
            <h1 className="font-display text-3xl text-green-800">Vowel Marks!</h1>
            <p className="font-display text-base text-green-600">Learn the Nikud 🎵</p>
          </div>
        </div>

        {/* Nikud preview */}
        <div className="flex flex-wrap gap-3 justify-center bg-white/60 rounded-2xl p-4 mb-6">
          {BASIC_NIKUD.map(n => (
            <div
              key={n.id}
              className={`${n.color} rounded-xl w-16 h-16 flex flex-col items-center justify-center border-2 border-white/60 shadow`}
            >
              <span className="hebrew-text text-2xl font-bold">{n.example}</span>
              <span className="font-display text-xs text-gray-600">{n.sound}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <ActivityCard
            emoji="🎵"
            title="Learn Vowels"
            subtitle="Meet each nikud!"
            color="bg-green-300"
            onClick={() => setMode('learn')}
            stars={getLessonStars('nikud', 'learn')}
          />
          <ActivityCard
            emoji="🎯"
            title="Vowel Quiz"
            subtitle="Hear and pick the vowel!"
            color="bg-teal-300"
            onClick={() => setMode('quiz')}
            stars={getLessonStars('nikud', 'quiz')}
          />
        </div>
      </div>
    </div>
  );
}

function ActivityCard({
  emoji, title, subtitle, color, onClick, stars,
}: {
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

// ---- Learn Mode ----
function NikudLearnMode({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const { say, isSpeaking } = useSpeech();
  const { completeLesson } = useProgress();
  const [completed, setCompleted] = useState(false);

  const current = BASIC_NIKUD[idx];

  useEffect(() => {
    const t = setTimeout(() => say(current.sound), 400);
    return () => clearTimeout(t);
  }, [idx]);

  const next = () => {
    if (idx < BASIC_NIKUD.length - 1) {
      setDirection(1);
      setIdx(i => i + 1);
    } else {
      completeLesson('nikud', 'learn', 1);
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">🎉</motion.div>
        <h2 className="font-display text-3xl text-green-800">Fantastic!</h2>
        <KidButton onClick={onBack} color="bg-green-400">Back</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-green-600">{idx + 1} / {BASIC_NIKUD.length}</div>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {BASIC_NIKUD.map((_, i) => (
            <div key={i} className={`rounded-full transition-all ${i <= idx ? 'w-4 h-4 bg-green-400' : 'w-3 h-3 bg-green-200'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 200, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -200, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`${current.color} rounded-3xl p-8 text-center shadow-2xl border-4 border-white/60 mb-6`}
          >
            {/* Big aleph with nikud */}
            <motion.div
              className="hebrew-text text-[120px] leading-none font-bold text-gray-800 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {current.example}
            </motion.div>

            <div className="text-5xl mb-3">{current.emoji}</div>

            <div className="hebrew-text text-2xl font-bold text-gray-700 mb-1">{current.name}</div>
            <div className="font-display text-xl text-gray-600">{current.nameEn}</div>
            <div className="font-display text-2xl text-gray-700 mt-2">
              sounds like: <strong>"{current.sound}"</strong>
            </div>

            <div className="flex justify-center mt-4">
              <SpeakButton onClick={() => say(current.sound)} isSpeaking={isSpeaking} size="lg" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4">
          <KidButton onClick={() => { setDirection(-1); setIdx(i => Math.max(0, i - 1)); }} disabled={idx === 0} color="bg-white" className="flex-1">
            ← Prev
          </KidButton>
          <KidButton onClick={next} color="bg-green-400" className="flex-1">
            {idx === BASIC_NIKUD.length - 1 ? '🎉 Done!' : 'Next →'}
          </KidButton>
        </div>
      </div>
    </div>
  );
}

// ---- Quiz Mode ----
function NikudQuizMode({ onBack }: { onBack: () => void }) {
  const { say } = useSpeech();
  const { completeLesson } = useProgress();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shakingId, setShakingId] = useState<string | null>(null);

  const ROUNDS = 8;
  const questions = useRef<Array<{ target: Nikud; choices: Nikud[] }>>([]);

  useEffect(() => {
    const pool = [...BASIC_NIKUD].sort(() => Math.random() - 0.5);
    questions.current = Array.from({ length: ROUNDS }, (_, i) => {
      const target = pool[i % pool.length];
      const others = BASIC_NIKUD.filter(n => n.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
      return { target, choices: [...[target, ...others]].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const q = questions.current[round];

  useEffect(() => {
    if (q) setTimeout(() => say(q.target.sound), 300);
  }, [round]);

  const handleChoice = (n: Nikud) => {
    if (chosen) return;
    setChosen(n.id);
    const isCorrect = n.id === q.target.id;
    if (isCorrect) {
      setCorrect(c => c + 1);
      setShowBurst(true);
    } else {
      setShakingId(n.id);
      setTimeout(() => setShakingId(null), 500);
    }
    setTimeout(() => {
      setChosen(null);
      if (round + 1 >= ROUNDS) {
        const c2 = correct + (isCorrect ? 1 : 0);
        completeLesson('nikud', 'quiz', c2 >= ROUNDS * 0.8 ? 3 : c2 >= ROUNDS * 0.5 ? 2 : 1);
        setFinished(true);
      } else {
        setRound(r => r + 1);
      }
    }, 1000);
  };

  if (!q) return null;

  if (finished) {
    const stars = correct >= ROUNDS * 0.8 ? 3 : correct >= ROUNDS * 0.5 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">
          {stars === 3 ? '🏆' : '🎉'}
        </motion.div>
        <h2 className="font-display text-3xl text-green-800">{correct}/{ROUNDS} correct!</h2>
        <StarsDisplay stars={stars} size="lg" />
        <KidButton onClick={onBack} color="bg-green-400">Back</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-green-600">{round + 1} / {ROUNDS}</div>
        </div>

        <motion.div
          key={round}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-3xl p-6 text-center shadow-xl border-4 border-green-200 mb-6"
        >
          <p className="font-display text-xl text-gray-600 mb-2">Which vowel says:</p>
          <div
            className="font-display text-5xl font-bold text-green-700 cursor-pointer mb-2"
            onClick={() => say(q.target.sound)}
          >
            "{q.target.sound}"
          </div>
          <div className="text-4xl">{q.target.emoji}</div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {q.choices.map(n => {
            let state = 'idle';
            if (chosen) {
              if (n.id === q.target.id) state = 'correct';
              else if (n.id === chosen) state = 'wrong';
            }
            return (
              <motion.button
                key={n.id}
                onClick={() => handleChoice(n)}
                disabled={!!chosen}
                animate={shakingId === n.id ? { x: [-8, 8, -8, 8, 0] } : state === 'correct' ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`
                  ${n.color} rounded-2xl p-4 border-4 shadow-lg min-h-[96px]
                  flex flex-col items-center justify-center no-select
                  ${state === 'correct' ? 'border-green-400 ring-4 ring-green-300' : ''}
                  ${state === 'wrong' ? 'border-red-400 opacity-50' : 'border-white/60'}
                  ${!chosen ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <span className="hebrew-text text-4xl font-bold">{n.example}</span>
                <span className="font-display text-sm text-gray-600">{n.nameEn}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
