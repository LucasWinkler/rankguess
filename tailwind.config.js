const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'blueish-grey-500': '#425B99',
      'blueish-grey-700': '#202C4A',
      'blueish-grey-800': '#0B1324',
      'blueish-grey-900': '#0A1020',
      'neutral-100': '#FFFFFF',
      'neutral-200': '#D4DDF2',
      'neutral-300': '#C0CDEC',
      'neutral-400': '#C6CFE6',
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
    },
  },
  plugins: [],
};
