/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      dark: '#1C252C',
      yellow: '#FFA05C',
      lightYellow: '#fcb37e',
      white: '#FFFFFF',
      grey: '#494f55',
      lightGrey: '#f6f8f9',
      backdropColor: 'rgba(0, 0, 0, 0.5)',
      green: '#13954c',
      lightGreen: '#5bcd7f',
      red: '#c7342a',
    },
    fontFamily: {
      headfont: ['Merriweather Sans Variable', 'sans-serif;'],
      bodyFont: ['Lato', 'sans-serif;'],
    },
    screens: {
      xs: '480px', // Extra small screens
      sm: '640px', // Small screens (default Tailwind breakpoint)
      md: '768px', // Medium screens (default Tailwind breakpoint)
      lg: '1024px', // Large screens (default Tailwind breakpoint)
      xl: '1280px', // Extra large screens (default Tailwind breakpoint)
      '2xl': '1536px', // 2x large screens (default Tailwind breakpoint)
      '3xl': '1920px', // Custom 3x large screens
    },
  },
  plugins: [],
};
