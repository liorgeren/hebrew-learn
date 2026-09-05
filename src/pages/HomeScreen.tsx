import { motion } from 'framer-motion';
import { useProgress, WorldId } from '../context/ProgressContext';
import StarsDisplay from '../components/StarsDisplay';

interface WorldCard {
  id: WorldId;
  title: string;
  subtitle: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  number: number;
}

const WORLDS: WorldCard[] = [
  {
    id: 'letters',
    title: 'אָלֶף-בֵּית',
    subtitle: 'Learn the Letters',
    emoji: '🔤',
    bgGradient: 'from-yellow-300 to-orange-300',
    borderColor: 'border-orange-400',
    shadowColor: 'shadow-orange-200',
    number: 1,
  },
  {
    id: 'words',
    title: 'מִלִּים',
    subtitle: 'Read Words',
    emoji: '📚',
    bgGradient: 'from-pink-300 to-rose-300',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-200',
    number: 2,
  },
];

interface HomeScreenProps {
  onSelectWorld: (world: WorldId) => void;
}

export default function HomeScreen({ onSelectWorld }: HomeScreenProps) {
  const { progress, isWorldUnlocked, resetProgress } = useProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-100 to-purple-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center mb-6"
      >
        <div className="text-6xl mb-2">🇮🇱</div>
        <h1 className="font-display text-4xl md:text-5xl text-blue-800 drop-shadow-sm">
          Hebrew for Kids
        </h1>
        <p className="font-display text-lg text-blue-600 mt-1">
          ⭐ {progress.totalStars} stars collected!
        </p>
      </motion.div>

      {/* Decorative clouds */}
      <div className="absolute top-16 left-4 text-5xl opacity-50 pointer-events-none">☁️</div>
      <div className="absolute top-24 right-8 text-4xl opacity-40 pointer-events-none">☁️</div>

      {/* World Cards */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {WORLDS.map((world, idx) => {
          const unlocked = isWorldUnlocked(world.id);
          const worldProgress = progress.worlds[world.id];
          const completedLessons = Object.values(worldProgress.lessons).filter(l => l.completed).length;

          return (
            <motion.div
              key={world.id}
              initial={{ x: idx % 2 === 0 ? -60 : 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.12, type: 'spring', stiffness: 180 }}
              onClick={() => unlocked && onSelectWorld(world.id)}
              className={`
                relative rounded-3xl border-4 p-5 shadow-xl ${world.borderColor} ${world.shadowColor}
                bg-gradient-to-br ${world.bgGradient}
                ${unlocked ? 'cursor-pointer active:scale-95 transition-transform' : 'opacity-60 cursor-not-allowed'}
              `}
              whileTap={unlocked ? { scale: 0.96 } : {}}
            >
              <div className="flex items-center gap-4">
                {/* Number badge */}
                <div className="bg-white/60 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-display font-bold text-gray-700 flex-shrink-0 border-2 border-white/80">
                  {world.number}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="hebrew-text text-2xl font-bold text-gray-800 leading-tight">
                    {world.title}
                  </div>
                  <div className="font-display text-base text-gray-700">{world.subtitle}</div>
                  {completedLessons > 0 && (
                    <div className="mt-1">
                      <StarsDisplay stars={Math.min(worldProgress.totalStars, 3)} size="sm" />
                    </div>
                  )}
                </div>

                {/* Emoji & lock */}
                <div className="text-4xl flex-shrink-0">
                  {unlocked ? world.emoji : '🔒'}
                </div>
              </div>

              {/* Progress bar */}
              {unlocked && completedLessons > 0 && (
                <div className="mt-3 bg-white/40 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-white/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((completedLessons / 5) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.12 + 0.3 }}
                  />
                </div>
              )}

              {/* Lock overlay message */}
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/20">
                  <span className="font-display text-gray-600 text-sm bg-white/80 px-3 py-1 rounded-full">
                    Complete World {world.number - 1} first!
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Reset button (bottom, small) */}
      <button
        onClick={() => {
          if (window.confirm('Reset all progress?')) resetProgress();
        }}
        className="mt-8 text-sm text-gray-400 underline"
      >
        Reset Progress
      </button>

      {/* Decorative bottom */}
      <div className="mt-6 text-4xl flex gap-3 opacity-60">
        🐝 🦋 🌸 🌻
      </div>
    </div>
  );
}
