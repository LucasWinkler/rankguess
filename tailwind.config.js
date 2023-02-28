const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'pale-blueish-grey': '#202C4A',
      'dark-blue': '#0A1020',
      'neutral-100': '#FFFFFF',
      'neutral-200': '#D4DDF2',
      'neutral-300': '#C0CDEC',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
      screens: {
        xs: '420px',
        ...defaultTheme.screens,
      },
      // gridTemplateColumns: {
      //   games: 'repeat(auto-fill, minmax(192px, 1fr))',
      // },
    },
  },
  plugins: [],
};
