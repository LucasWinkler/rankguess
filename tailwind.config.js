const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue-300': '#5476f2',
      'blue-400': '#2B55EE',
      'blueish-grey-500': '#425B99',
      'blueish-grey-600': '#202C4A',
      'blueish-grey-700': '#111B36',
      'blueish-grey-800': '#0B1324',
      'blueish-grey-900': '#0A1020',
      'neutral-100': '#FFFFFF',
      'neutral-200': '#D4DDF2',
      'neutral-300': '#C0CDEC',
      'neutral-400': '#C6CFE6',
      'neutral-900': '#000000',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
      screens: {
        xs: '420px',
        ...defaultTheme.screens,
      },
      spacing: {
        'navigation-height': 'var(--navigation-height)',
      },
      backgroundImage: {
        'grid-tile': 'url("/images/grid-tile.svg")',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(0.5rem)' },
          '50%': { transform: 'translateX(-0.5rem)' },
          '75%': { transform: 'translateX(0.5rem)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        shake: 'shake 0.25s ease-in-out forwards',
        'reduced-shake': 'shake 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
