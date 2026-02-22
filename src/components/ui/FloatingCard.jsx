export default function FloatingCard({ children, text, position, rotation, color, delay }) {
  const bgColor = color === 'primary' 
    ? 'bg-primary' 
    : color === 'secondary' 
      ? 'bg-secondary' 
      : 'bg-white';
  
  const textColor = color === 'primary' || color === 'secondary' 
    ? 'text-white' 
    : 'text-foreground';

  return (
    <div
      className={`absolute ${position} ${bgColor} ${textColor} p-6 rounded-2xl shadow-xl border border-surface-light dark:border-gray-800 max-w-xs w-full`}
      style={{
        '--rotation': rotation,
        animation: `float 6s ease-in-out infinite ${delay}`,
      }}
    >
      {children ? (
        children
      ) : (
        <>
          <p className="text-lg font-bold mb-2">{text}</p>
          <div
            className={`h-2 w-20 rounded-full ${
              color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
            }`}
          ></div>
        </>
      )}
    </div>
  )
}
