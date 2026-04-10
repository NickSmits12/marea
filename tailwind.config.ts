import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        olive: {
          DEFAULT: '#5C6B3A',
          light: '#7A8B50',
          dark: '#3D4A26',
          muted: '#8A9B6A',
        },
        sienna: {
          DEFAULT: '#E07B39',
          light: '#F09A5A',
          dark: '#B85E22',
        },
        espresso: {
          DEFAULT: '#2C1A0E',
          light: '#4A2E1A',
          muted: '#6B4A30',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #1A0F06 0%, #2C1A0E 30%, #3D2A14 55%, #4A3520 80%, #2C1A0E 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
