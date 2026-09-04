import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import KidButton from '../../components/KidButton';
import StarBurst from '../../components/StarBurst';
import StarsDisplay from '../../components/StarsDisplay';
import { useProgress } from '../../context/ProgressContext';
import { Letter } from '../../data/letters';
import { useLetterAudio } from '../../hooks/useLetterAudio';

interface Card {
  id: string;
  letterId: string;
  letter: Letter;
  type: 'letter' | 'name';
}

interface MemoryMatchProps {
  letters: Letter[];
  lessonId: string;
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MemoryMatch({ letters, lessonId, onBack }: MemoryMatchProps) {
  const { play } = useLetterAudio();
  const { completeLesson } = useProgress();

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const [finished, setFinished] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Use first 4 letters for memory match (8 cards total)
    const subset = letters.slice(0, 4);
    const deck: Card[] = shuffle([
      ...subset.map(l => ({ id: `${l.id}-letter`, letterId: l.id, letter: l, type: 'letter' as const })),
      ...subset.map(l => ({ id: `${l.id}-name`, letterId: l.id, letter: l, type: 'name' as const })),
    ]);
    setCards(deck);
  }, []);

  const totalPairs = Math.min(letters.length, 4);

  const flip = (card: Card) => {
    if (checking) return;
    if (flipped.includes(card.id)) return;
    if (matched.has(card.letterId)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setChecking(true);
      const [a, b] = newFlipped.map(id => cards.find(c => c.id === id)!);
      if (a.letterId === b.letterId) {
        // Match!
        play(a.letter);
        setShowBurst(true);
        const newMatched = new Set(matched);
        newMatched.add(a.letterId);
        setTimeout(() => {
          setFlipped([]);
          setMatched(newMatched);
          setChecking(false);
          if (newMatched.size === totalPairs) {
            const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs * 2 ? 2 : 1;
            completeLesson('letters', lessonId, stars);
            setFinished(true);
          }
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setChecking(false);
        }, 900);
      }
    }
  };

  const isFlipped = (card: Card) => flipped.includes(card.id) || matched.has(card.letterId);

  if (finished) {
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs * 2 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">🏆</motion.div>
        <h2 className="font-display text-3xl text-rose-700">All matched!</h2>
        <p className="font-display text-lg text-rose-500">{moves} moves</p>
        <StarsDisplay stars={stars} size="lg" />
        <KidButton onClick={onBack} color="bg-pink-400">Back to Activities</KidButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex flex-col items-center px-4 py-6">
      <StarBurst active={showBurst} onComplete={() => setShowBurst(false)} />

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <div className="font-display text-rose-600 text-lg">
            {matched.size} / {totalPairs} matches
          </div>
        </div>

        <p className="font-display text-center text-lg text-rose-700 mb-4">
          Match each letter to its name! 🃏
        </p>

        <div className="grid grid-cols-4 gap-3">
          {cards.map(card => {
            const faceUp = isFlipped(card);
            const isMatched = matched.has(card.letterId);

            return (
              <motion.div
                key={card.id}
                onClick={() => flip(card)}
                whileTap={!faceUp ? { scale: 0.9 } : {}}
                className={`
                  aspect-square rounded-2xl border-4 cursor-pointer shadow-lg
                  flex items-center justify-center
                  ${isMatched ? 'border-green-400 bg-green-200' : faceUp ? `${card.letter.color} border-orange-300` : 'bg-indigo-400 border-indigo-300 hover:bg-indigo-500'}
                  no-select transition-colors
                `}
              >
                <AnimatePresence mode="wait">
                  {faceUp ? (
                    <motion.div
                      key="face"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      {card.type === 'letter' ? (
                        <span className="hebrew-text text-3xl font-bold">{card.letter.letter}</span>
                      ) : (
                        <span className="font-display text-xs text-center px-1 leading-tight">
                          {card.letter.nameEn}
                        </span>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl"
                    >
                      ✡️
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center mt-4 font-display text-rose-600">{moves} moves so far</p>
      </div>
    </div>
  );
}
