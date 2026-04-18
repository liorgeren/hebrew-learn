import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface KidButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: string;    // tailwind bg class
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function KidButton({
  onClick,
  children,
  color = 'bg-yellow-400',
  disabled = false,
  size = 'md',
  className = '',
}: KidButtonProps) {
  const sizeClasses = {
    sm: 'text-base px-4 py-2 min-h-[44px]',
    md: 'text-xl px-6 py-3 min-h-[56px]',
    lg: 'text-2xl px-8 py-4 min-h-[72px]',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      className={`
        ${color} ${sizeClasses[size]} ${className}
        rounded-2xl font-display font-bold shadow-lg border-4 border-black/10
        transition-all no-select cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        active:shadow-md
      `}
    >
      {children}
    </motion.button>
  );
}
