import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StarParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

interface StarBurstProps {
  active: boolean;
  onComplete?: () => void;
}

export default function StarBurst({ active, onComplete }: StarBurstProps) {
  const [particles, setParticles] = useState<StarParticle[]>([]);

  useEffect(() => {
    if (!active) return;
    const newParticles: StarParticle[] = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      y: Math.random() * -80 - 20,
      angle: (i / 18) * 360,
      color: COLORS[i % COLORS.length],
    }));
    setParticles(newParticles);
    const t = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 1200);
    return () => clearTimeout(t);
  }, [active, onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute text-2xl"
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, x: p.x * 3, y: p.y * 3, scale: 1.5, rotate: p.angle * 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ color: p.color }}
          >
            ⭐
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
