/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4757', // Vibrant Red/Pink for a trendy NGL-like feel
        'primary-hover': '#ff6b81',
        secondary: '#2ed573', // Vibrant Green accent
        'background-light': '#ffffff',
        'background-dark': '#0f1115',
        'surface-light': '#f1f2f6',
        'surface-dark': '#1e2126',
        'text-main-light': '#1e272e',
        'text-main-dark': '#dfe4ea',
        'text-muted-light': '#57606f',
        'text-muted-dark': '#a4b0be',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite linear',
        gradient: 'gradient 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'float-slow': {
          '0%': { transform: 'translate(-50%, 0px)' },
          '50%': { transform: 'translate(-50%, -15px)' },
          '100%': { transform: 'translate(-50%, 0px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 71, 87, 0.7)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(255, 71, 87, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 71, 87, 0)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'primary-glow': '0 0 20px rgba(255, 71, 87, 0.3)',
        'secondary-glow': '0 0 20px rgba(46, 213, 115, 0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}