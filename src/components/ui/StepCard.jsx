export default function StepCard({ icon, title, description, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    purple:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    green:
      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  }

  return (
    <div className="bg-background-light dark:bg-background-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center shrink-0`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-text-muted-light dark:text-text-muted-dark">
          {description}
        </p>
      </div>
    </div>
  )
}