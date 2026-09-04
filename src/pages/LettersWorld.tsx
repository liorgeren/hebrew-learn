import { motion } from 'framer-motion';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import StarsDisplay from '../components/StarsDisplay';
import { useProgress } from '../context/ProgressContext';
import { LETTERS } from '../data/letters';
import LetterChart from './letters/LetterChart';
import LetterLearnMode from './letters/LetterLearnMode';
import LetterQuizMode from './letters/LetterQuizMode';
import MemoryMatch from './letters/MemoryMatch';

type Mode = 'menu' | 'chart' | 'learn' | 'quiz' | 'memory';

interface LettersWorldProps {
  onBack: () => void;
}

export default function LettersWorld({ onBack }: LettersWorldProps) {
  const [mode, setMode] = useState<Mode>('menu');
  const { getLessonStars } = useProgress();

  if (mode === 'chart') {
    return <LetterChart letters={LETTERS} onBack={() => setMode('menu')} />;
  }
  if (mode === 'learn') {
    return (
      <LetterLearnMode
        letters={LETTERS}
        lessonId="learn-all"
        onBack={() => setMode('menu')}
      />
    );
  }
  if (mode === 'quiz') {
    return (
      <LetterQuizMode
        letters={LETTERS}
        allLetters={LETTERS}
        lessonId="quiz-all"
        onBack={() => setMode('menu')}
      />
    );
  }
  if (mode === 'memory') {
    return (
      <MemoryMatch
        letters={LETTERS}
        lessonId="memory-all"
        onBack={() => setMode('menu')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <BackButton onClick={onBack} />
          <div>
            <h1 className="font-display text-3xl text-orange-800">The Aleph-Bet!</h1>
            <p className="font-display text-base text-orange-600">22 Hebrew Letters 🔤</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ActivityCard
            emoji="🔤"
            title="All Letters"
            subtitle="See the whole chart!"
            color="bg-teal-300"
            onClick={() => setMode('chart')}
            stars={0}
          />
          <ActivityCard
            emoji="📖"
            title="Learn"
            subtitle="Meet all the letters!"
            color="bg-yellow-300"
            onClick={() => setMode('learn')}
            stars={getLessonStars('letters', 'learn-all')}
          />
          <ActivityCard
            emoji="🎯"
            title="Tap the Letter"
            subtitle="Hear and find it!"
            color="bg-orange-300"
            onClick={() => setMode('quiz')}
            stars={getLessonStars('letters', 'quiz-all')}
          />
          <ActivityCard
            emoji="🃏"
            title="Memory Match"
            subtitle="Find the pairs!"
            color="bg-pink-300"
            onClick={() => setMode('memory')}
            stars={getLessonStars('letters', 'memory-all')}
          />
        </div>
      </div>
    </div>
  );
}

interface ActivityCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
  stars: number;
}

function ActivityCard({ emoji, title, subtitle, color, onClick, stars }: ActivityCardProps) {
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
