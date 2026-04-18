import { motion } from 'framer-motion';

interface SpeakButtonProps {
  onClick: () => void;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SpeakButton({ onClick, isSpeaking = false, size = 'md' }: SpeakButtonProps) {
  const sizeMap = { sm: 'text-2xl w-12 h-12', md: 'text-3xl w-16 h-16', lg: 'text-4xl w-20 h-20' };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      animate={isSpeaking ? { scale: [1, 1.15, 1, 1.15, 1] } : {}}
      transition={isSpeaking ? { duration: 0.8, repeat: Infinity } : {}}
      className={`
        ${sizeMap[size]}
        bg-blue-400 hover:bg-blue-500 active:bg-blue-600
        rounded-full shadow-lg border-4 border-blue-200
        flex items-center justify-center no-select cursor-pointer
        transition-colors
      `}
    >
      🔊
    </motion.button>
  );
}
