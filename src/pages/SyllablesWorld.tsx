import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import KidButton from '../components/KidButton';
import SpeakButton from '../components/SpeakButton';
import StarBurst from '../components/StarBurst';
import StarsDisplay from '../components/StarsDisplay';
import { useProgress } from '../context/ProgressContext';
import { BASIC_NIKUD, Nikud } from '../data/nikud';
import { SYLLABLES, Syllable } from '../data/syllables';
import { useSpeech } from '../hooks/useSpeech';

interface SyllablesWorldProps {
  onBack: () => void;
}

type Mode = 'menu' | 'builder' | 'quiz';

const BUILDER_LETTERS = [
  { letter: 'ב', name: 'Bet', sound: 'b', color: 'bg-orange-200' },
  { letter: 'מ', name: 'Mem', sound: 'm', color: 'bg-cyan-200' },
  { letter: 'ד', name: 'Dalet', sound: 'd', color: 'bg-purple-200' },
  { letter: 'ל', name: 'Lamed', sound: 'l', color: 'bg-lime-200' },
  { letter: 'שׁ', name: 'Shin', sound: 'sh', color: 'bg-fuchsia-200' },
];

export default function SyllablesWorld({ onBack }: SyllablesWorldProps) {
  const [mode, setMode] = useState<Mode>('menu');
  const { getLessonStars } = useProgress();

  if (mode === 'builder') return <SyllableBuilder onBack={() => setMode('menu')} />;
  if (mode === 'quiz') return <SyllableQuiz onBack={() => setMode('menu')} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <BackButton onClick={onBack} />
          <div>
            <h1 className="font-display text-3xl text-blue-800">Syllables!</h1>
            <p className="font-display text-base text-blue-600">Build sounds 🧩</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ActivityCard
            emoji="🔨"
            title="Syllable Builder"
            subtitle="Combine letter + vowel!"
            color="bg-blue-300"
            onClick={() => setMode('builder')}
            stars={getLessonStars('syllables', 'builder')}
          />
          <ActivityCard
            emoji="🎧"
            title="Syllable Quiz"
            subtitle="Hear it, pick it!"
            color="bg-indigo-300"
            onClick={() => setMode('quiz')}
            stars={getLessonStars('syllables', 'quiz')}
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

// ---- Syllable Builder ----
function SyllableBuilder({ onBack }: { onBack: () => void }) {
  const { say, isSpeaking } = useSpeech();
  const { completeLesson } = useProgress();
  const [selectedLetter, setSelectedLetter] = useState<typeof BUILDER_LETTERS[0] | null>(null);
  const [selectedNikud, setSelectedNikud] = useState<Nikud | null>(null);
  const [practiced, setPracticed] = useState(new Set<string>());
  const [showBurst, setShowBurst] = useState(false);

  const syllable = selectedLetter && selectedNikud
    ? SYLLABLES.find(s => s.baseLetter === selectedLetter.letter && s.nikudId === selectedNikud.id)
    : null;

  const speakSyllable = () => {
    if (syllable) {
      say(syllable.text, 0.5);
      setShowBurst(true);
      const newPracticed = new Set(practiced);
      newPracticed.add(syllable.id);
      setPracticed(newPracticed);
      if (newPracticed.size >= 5) {
        completeLesson('syllables', 'builder', 2);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-blue-600">Build a syllable! 🔨</div>
        </div>

        {/* Result display */}
        <div className="bg-white/80 rounded-3xl p-6 text-center shadow-xl border-4 border-blue-200 mb-6 min-h-[140px] flex flex-col items-center justify-center">
          {syllable ? (
            <>
              <div className="hebrew-text text-[90px] leading-none font-bold text-blue-800 mb-2">
                {syllable.text}
              </div>
              <div className="font-display text-2xl text-blue-600">"{syllable.sound}"</div>
              <div className="mt-3">
                <SpeakButton onClick={speakSyllable} isSpeaking={isSpeaking} size="md" />
              </div>
            </>
          ) : (
            <p className="font-display text-xl text-gray-400">
              {!selectedLetter ? 'Pick a letter below 👇' : 'Now pick a vowel 👇'}
            </p>
          )}
        </div>

        {/* Letter picker */}
        <div className="mb-4">
          <p className="font-display text-blue-700 mb-2 text-center">Step 1: Pick a letter</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {BUILDER_LETTERS.map(l => (
              <motion.button
                key={l.letter}
                onClick={() => setSelectedLetter(l)}
                whileTap={{ scale: 0.9 }}
                className={`
                  ${l.color} rounded-xl w-16 h-16 hebrew-text text-3xl font-bold border-4
                  no-select cursor-pointer transition-all shadow
                  ${selectedLetter?.letter === l.letter ? 'border-blue-500 ring-4 ring-blue-300 scale-110' : 'border-white/60'}
                `}
              >
                {l.letter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Nikud picker */}
        <div>
          <p className="font-display text-blue-700 mb-2 text-center">Step 2: Pick a vowel</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {BASIC_NIKUD.map(n => (
              <motion.button
                key={n.id}
                onClick={() => setSelectedNikud(n)}
                whileTap={{ scale: 0.9 }}
                className={`
                  ${n.color} rounded-xl w-16 h-16 flex flex-col items-center justify-center border-4
                  no-select cursor-pointer shadow
                  ${selectedNikud?.id === n.id ? 'border-blue-500 ring-4 ring-blue-300 scale-110' : 'border-white/60'}
                `}
              >
                <span className="hebrew-text text-2xl font-bold">{n.example}</span>
                <span className="font-display text-xs text-gray-600">{n.sound}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center font-display text-blue-500 mt-4">
          {practiced.size} syllables practiced!
        </p>
      </div>
    </div>
  );
}

// ---- Syllable Quiz ----
function SyllableQuiz({ onBack }: { onBack: () => void }) {
  const { say } = useSpeech();
  const { completeLesson } = useProgress();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shakingId, setShakingId] = useState<string | null>(null);

  const ROUNDS = 8;
  const questions = useRef<Array<{ target: Syllable; choices: Syllable[] }>>([]);

  useEffect(() => {
    const pool = [...SYLLABLES].sort(() => Math.random() - 0.5);
    questions.current = Array.from({ length: ROUNDS }, (_, i) => {
      const target = pool[i % pool.length];
      const others = SYLLABLES.filter(s => s.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
      return { target, choices: [target, ...others].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const q = questions.current[round];

  useEffect(() => {
    if (q) setTimeout(() => say(q.target.text, 0.5), 300);
  }, [round]);

  const handleChoice = (s: Syllable) => {
    if (chosen) return;
    setChosen(s.id);
    const isCorrect = s.id === q.target.id;
    if (isCorrect) {
      setCorrect(c => c + 1);
      setShowBurst(true);
    } else {
      setShakingId(s.id);
      setTimeout(() => setShakingId(null), 500);
    }
    setTimeout(() => {
      setChosen(null);
      if (round + 1 >= ROUNDS) {
        const c2 = correct + (isCorrect ? 1 : 0);
        completeLesson('syllables', 'quiz', c2 >= ROUNDS * 0.8 ? 3 : c2 >= ROUNDS * 0.5 ? 2 : 1);
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
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">{stars === 3 ? '🏆' : '🎉'}</motion.div>
        <h2 className="font-display text-3xl text-blue-800">{correct}/{ROUNDS} correct!</h2>
        <StarsDisplay stars={stars} size="lg" />
        <KidButton onClick={onBack} color="bg-blue-400">Back</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-blue-600">{round + 1} / {ROUNDS}</div>
        </div>

        <motion.div
          key={round}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-3xl p-6 text-center shadow-xl border-4 border-blue-200 mb-6"
        >
          <p className="font-display text-xl text-gray-500 mb-2">Which syllable do you hear?</p>
          <div
            className="font-display text-4xl font-bold text-blue-700 cursor-pointer mb-2"
            onClick={() => say(q.target.text, 0.5)}
          >
            🎧 "{q.target.sound}"
          </div>
          <p className="font-display text-sm text-gray-400">
            {q.target.letterNameEn} + {q.target.nikudId}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {q.choices.map(s => {
            let state = 'idle';
            if (chosen) {
              if (s.id === q.target.id) state = 'correct';
              else if (s.id === chosen) state = 'wrong';
            }
            return (
              <motion.button
                key={s.id}
                onClick={() => handleChoice(s)}
                disabled={!!chosen}
                animate={shakingId === s.id ? { x: [-8, 8, -8, 8, 0] } : state === 'correct' ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`
                  bg-blue-200 rounded-2xl p-4 border-4 min-h-[96px]
                  flex flex-col items-center justify-center no-select
                  ${state === 'correct' ? 'border-green-400 ring-4 ring-green-300 bg-green-100' : ''}
                  ${state === 'wrong' ? 'border-red-400 opacity-50' : state === 'idle' ? 'border-white/60' : ''}
                  ${!chosen ? 'cursor-pointer hover:bg-blue-300' : 'cursor-default'}
                `}
              >
                <span className="hebrew-text text-5xl font-bold text-blue-900">{s.text}</span>
                {state !== 'idle' && (
                  <span className="font-display text-sm text-gray-600">{s.sound}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
