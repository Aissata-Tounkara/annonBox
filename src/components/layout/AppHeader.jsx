"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseByVariant = {
  default: "w-full border-b border-surface-light dark:border-surface-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50",
  compact: "w-full border-b border-surface-light dark:border-surface-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50",
  dashboard: "w-full border-b border-surface-light dark:border-surface-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300",
  save: "w-full border-b border-gray-200 dark:border-[#1e2126] bg-white dark:bg-[#0f1115] sticky top-0 z-50",
};

const containerByVariant = {
  default: "max-w-6xl mx-auto px-6",
  compact: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  dashboard: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  save: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
};

const headerByVariant = {
  default: "flex items-center h-20",
  compact: "flex items-center h-16 sm:h-20",
  dashboard: "flex items-center justify-between h-14 sm:h-16",
  save: "flex items-center h-16 sm:h-20",
};

const iconWrapByVariant = {
  default: "w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20",
  compact: "w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20",
  dashboard: "w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20",
  save: "w-10 h-10 bg-linear-to-br from-[#ff4757] to-[#2ed573] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#ff4757]/20",
};

const iconByVariant = {
  default: <Mail size={22} />,
  compact: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  dashboard: (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  save: <span className="material-symbols-outlined text-2xl">mail</span>,
};

export default function AppHeader({
  variant = "default",
  withShadow = false,
  rightSlot,
  logoHref,
}) {
  const isDashboard = variant === "dashboard";

  return (
    <div className={cn(baseByVariant[variant], withShadow && isDashboard ? "shadow-lg" : "") }>
      <div className={containerByVariant[variant]}>
        <header className={cn(headerByVariant[variant], rightSlot ? "justify-between" : "")}>
          <div className="flex items-center gap-3">
            {logoHref ? (
              <Link href={logoHref} className={iconWrapByVariant[variant]}>
                {iconByVariant[variant]}
              </Link>
            ) : (
              <div className={iconWrapByVariant[variant]}>{iconByVariant[variant]}</div>
            )}
            <h2 className={cn("text-xl font-bold tracking-tight", variant === "dashboard" ? "text-lg sm:text-xl" : "")}>AnonBox</h2>
          </div>

          {rightSlot ? rightSlot : null}
        </header>
      </div>
    </div>
  );
}
