import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#081225',
          light: '#F4F4F2',
        },
        secondary: {
          dark: '#0D1C39',
          light: '#E4E3E3',
        },
        accent: {
          ice: '#D1E3FF',
          'ice-soft': 'rgba(209, 227, 255, 0.12)',
          'ice-glow': 'rgba(209, 227, 255, 0.25)',
          gold: '#C5A880',
          'gold-soft': 'rgba(197, 168, 128, 0.15)',
        },
        stone: {
          editorial: '#E4E3E3',
          card: '#F4F4F2',
          surface: '#ECEBE8',
          border: 'rgba(8, 18, 37, 0.12)',
        },
        brand: {
          charcoal: '#111722',
          midnight: '#081225',
          oxford: '#0D1C39',
          slate: '#1E2D4A',
          silver: '#9BA8BE',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        monumental: '0.22em',
        editorial: '0.08em',
        tightest: '-0.035em',
      },
      boxShadow: {
        luxury: '0 25px 60px -15px rgba(4, 9, 18, 0.65)',
        'glow-ice': '0 0 30px rgba(209, 227, 255, 0.18)',
        'glow-gold': '0 0 35px rgba(197, 168, 128, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
