import { motion } from 'framer-motion';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import StarsDisplay from '../components/StarsDisplay';
import { useProgress } from '../context/ProgressContext';
import { getLettersByGroup, LETTER_GROUPS } from '../data/letters';
import LetterLearnMode from './letters/LetterLearnMode';
import LetterQuizMode from './letters/LetterQuizMode';
import MemoryMatch from './letters/MemoryMatch';

type Mode = 'menu' | 'learn' | 'quiz' | 'memory';

interface LettersWorldProps {
  onBack: () => void;
}

export default function LettersWorld({ onBack }: LettersWorldProps) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('menu');
  const { getLessonStars } = useProgress();

  if (selectedGroup !== null) {
    const letters = getLettersByGroup(selectedGroup);
    const lessonId = `group-${selectedGroup}`;
    const quizLessonId = `quiz-${selectedGroup}`;
    const memoryLessonId = `memory-${selectedGroup}`;

    if (mode === 'learn') {
      return (
        <LetterLearnMode
          letters={letters}
          groupNum={selectedGroup}
          onBack={() => setMode('menu')}
        />
      );
    }
    if (mode === 'quiz') {
      return (
          <LetterQuizMode
          letters={letters}
          allLetters={LETTER_GROUPS.flatMap(g => getLettersByGroup(g))}
          lessonId={quizLessonId}
          onBack={() => setMode('menu')}
        />
      );
    }
    if (mode === 'memory') {
      return (
        <MemoryMatch
          letters={letters}
          lessonId={memoryLessonId}
          onBack={() => setMode('menu')}
        />
      );
    }

    // Group activity menu
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <BackButton onClick={() => setSelectedGroup(null)} />
            <h2 className="font-display text-2xl text-orange-800">
              Group {selectedGroup} Activities
            </h2>
          </div>

          {/* Letter preview */}
          <div className="flex flex-wrap gap-3 justify-center mb-6 bg-white/60 rounded-2xl p-4">
            {letters.map(l => (
              <div
                key={l.id}
                className={`${l.color} rounded-xl w-14 h-14 flex items-center justify-center text-3xl hebrew-text font-bold border-2 border-white/60 shadow`}
              >
                {l.letter}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <ActivityCard
              emoji="📖"
              title="Learn"
              subtitle="Meet the letters!"
              color="bg-yellow-300"
              onClick={() => setMode('learn')}
              stars={getLessonStars('letters', lessonId)}
            />
            <ActivityCard
              emoji="🎯"
              title="Tap the Letter"
              subtitle="Hear and find it!"
              color="bg-orange-300"
              onClick={() => setMode('quiz')}
              stars={getLessonStars('letters', quizLessonId)}
            />
            <ActivityCard
              emoji="🃏"
              title="Memory Match"
              subtitle="Find the pairs!"
              color="bg-pink-300"
              onClick={() => setMode('memory')}
              stars={getLessonStars('letters', memoryLessonId)}
            />
          </div>
        </div>
      </div>
    );
  }

  // World overview - pick a group
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

        <div className="flex flex-col gap-3">
          {LETTER_GROUPS.map(group => {
            const groupLetters = getLettersByGroup(group);
            const learnStars = getLessonStars('letters', `group-${group}`);
            const quizStars = getLessonStars('letters', `quiz-${group}`);
            const memStars = getLessonStars('letters', `memory-${group}`);
            const totalStars = learnStars + quizStars + memStars;

            return (
              <motion.div
                key={group}
                onClick={() => setSelectedGroup(group)}
                whileTap={{ scale: 0.96 }}
                className="bg-white/80 rounded-2xl p-4 border-2 border-orange-200 shadow cursor-pointer flex items-center gap-4"
              >
                <div className="bg-orange-400 text-white rounded-xl w-10 h-10 flex items-center justify-center font-display text-xl font-bold">
                  {group}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 flex-wrap">
                    {groupLetters.map(l => (
                      <span key={l.id} className="hebrew-text text-xl font-bold text-gray-700">
                        {l.letter}
                      </span>
                    ))}
                  </div>
                  {totalStars > 0 && <StarsDisplay stars={Math.min(totalStars, 3)} size="sm" />}
                </div>
                <div className="text-gray-400 text-xl">›</div>
              </motion.div>
            );
          })}
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
