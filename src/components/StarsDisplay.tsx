interface StarsDisplayProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarsDisplay({ stars, maxStars = 3, size = 'md' }: StarsDisplayProps) {
  const sizeMap = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={`${sizeMap[size]} transition-all duration-300`}
          style={{ filter: i < stars ? 'none' : 'grayscale(1) opacity(0.3)' }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}
