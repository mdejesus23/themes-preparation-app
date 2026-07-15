/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // Light-only design
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
      blue: 'var(--custom-blue)',
      neutral: colors.neutral, // Used mainly for text color
      // Light shell (sidebar / header)
      headerBg: 'var(--header-bg)',
      headerText: 'var(--header-text)',
      headerGrey: 'var(--header-grey)',
      sidebarActive: 'var(--sidebar-active-bg)',
      sidebarActiveText: 'var(--sidebar-active-text)',
      // Status badges
      badgeGreenBg: 'var(--badge-green-bg)',
      badgeGreenText: 'var(--badge-green-text)',
      badgeAmberBg: 'var(--badge-amber-bg)',
      badgeAmberText: 'var(--badge-amber-text)',
      // Progress bar
      progressTrack: 'var(--progress-track)',
      progressFill: 'var(--progress-fill)',
      // Surface tokens
      bgPrimary: 'var(--bg-primary)',
      bgSecondary: 'var(--bg-secondary)',
      textPrimary: 'var(--text-primary)',
      textSecondary: 'var(--text-secondary)',
      borderColor: 'var(--border-color)',
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
