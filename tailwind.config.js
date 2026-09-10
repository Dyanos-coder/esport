/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D17',
          900: '#0B1220',
          850: '#0D1B2A',
          800: '#122438',
          700: '#1B2F47',
          600: '#243E5C',
        },
        lime: {
          400: '#D6FF66',
          500: '#BFFF00',
          600: '#9FD900',
          700: '#7FAD00',
        },
        purple: {
          400: '#A156E8',
          500: '#8A2BE2',
          600: '#7525C0',
        },
        cyan: {
          400: '#5DD8F0',
          500: '#2EC5E6',
          600: '#1A9FC0',
        },
        crimson: {
          400: '#FF334D',
          500: '#FF0020',
          600: '#D9001B',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-glow': 'floatGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'count-up': 'countUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(191, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(191, 255, 0, 0.6)' },
        },
        floatGlow: {
          '0%, 100%': { transform: 'translateY(0)', filter: 'drop-shadow(0 0 30px rgba(191,255,0,0.35))' },
          '50%': { transform: 'translateY(-18px)', filter: 'drop-shadow(0 0 60px rgba(191,255,0,0.6))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
