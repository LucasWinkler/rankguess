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
      backgroundImage: {
        'heading-circle': 'url("/images/heading-circle.png")',
        'gradient-test':
          'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg);',
      },
    },
  },
  plugins: [],
};
