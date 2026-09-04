import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton';
import { Letter } from '../../data/letters';
import { useLetterAudio } from '../../hooks/useLetterAudio';

interface LetterChartProps {
  letters: Letter[];
  onBack: () => void;
}

export default function LetterChart({ letters, onBack }: LetterChartProps) {
  const { play } = useLetterAudio();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <BackButton onClick={onBack} />
          <h2 className="font-display text-2xl text-orange-800">The Aleph-Bet Chart</h2>
        </div>

        <p className="text-center font-display text-sm text-orange-500 mb-4">
          Tap a letter to hear it
        </p>

        <div className="grid grid-cols-5 gap-3" dir="rtl">
          {letters.map((letter, i) => (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.6) }}
              whileTap={{ scale: 0.9 }}
              onClick={() => play(letter)}
              className={`
                ${letter.color} aspect-square rounded-2xl flex items-center justify-center
                border-4 border-white/60 shadow-lg no-select cursor-pointer
                hover:scale-105 transition-transform
              `}
            >
              <span className="hebrew-text text-3xl font-bold text-gray-800">{letter.letter}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
