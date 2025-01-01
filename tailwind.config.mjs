/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      dark: 'var(--custom-dark)',
      yellow: 'var(--custom-yellow)',
      lightYellow: 'var(--custom-light-yellow)',
      white: 'var(--custom-white)',
      grey: 'var(--custom-grey)',
      lightGrey: 'var(--custom-light-grey)',
      backdropColor: 'var(--custom-backdrop)',
      green: 'var(--custom-green)',
      lightGreen: 'var(--custom-light-green)',
      red: colors.red,
      blue: colors.blue,
      neutral: colors.neutral, // Used mainly for text color
    },
    fontFamily: {
      headfont: ['Merriweather Sans Variable', 'sans-serif'],
      bodyFont: ['Lato', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
