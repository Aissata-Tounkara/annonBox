'use client';

export default function AnimatedBadge({ 
  text,
  variant = 'surface',
  size = 'default',
  className = ''
}) {
  const variants = {
    surface: {
      bg: 'bg-surface-light dark:bg-surface-dark',
      border: 'border-gray-200 dark:border-gray-700',
      text: 'text-text-muted-light dark:text-text-muted-dark',
      dot: 'bg-secondary',
      animation: 'animate-pulse'
    },

    lime: {
      bg: 'bg-lime-600/10',
      border: 'border-lime-600/20',
      text: 'text-lime-500',
      dot: 'bg-lime-500',
      animation: 'animate-pulse'
    },

    blue: {
      bg: 'bg-blue-600/10',
      border: 'border-blue-600/20',
      text: 'text-blue-500',
      dot: 'bg-blue-500',
      animation: 'animate-pulse'
    },

    cyan: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
       border: 'border-cyan-200 dark:border-cyan-800',
      border: 'border-gray-200 dark:border-gray-700',
      dot: 'bg-secondary',
      animation: 'animate-pulse'
    }
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px]',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full border
        ${currentVariant.bg}
        ${currentVariant.border}
        ${currentVariant.text}
        ${currentSize}
        font-semibold uppercase tracking-wider
        ${className}
      `}
    >
      <span
        className={`
          w-2 h-2 rounded-full
          ${currentVariant.dot}
          ${currentVariant.animation}
        `}
      />
      {text}
    </div>
  );
}