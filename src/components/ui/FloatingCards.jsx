const FloatingCards = ({
  children,
  position = 'left-1/2 -translate-x-1/2 bottom-0',
  rotation = '0deg',
  color = 'primary',
  delay = '0s',
  className = '',
}) => {
  // Définir le gradient en fonction de la couleur
  const bgGradient =
    color === 'secondary'
      ? 'bg-gradient-to-br from-secondary to-green-400'
      : 'bg-gradient-to-br from-primary to-primary-hover';

  return (
    <div
      className={`absolute ${position} p-6 rounded-2xl shadow-2xl shadow-primary-glow text-white animate-float-slow ${bgGradient} ${className}`}
      style={{
        transform: `rotate(${rotation})`,
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
};

export default FloatingCards;