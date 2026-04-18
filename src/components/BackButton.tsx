import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = '← Back' }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-xl px-4 py-2 text-lg font-display font-bold text-gray-700 shadow border-2 border-gray-200 no-select"
    >
      {label}
    </motion.button>
  );
}
