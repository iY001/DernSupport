/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#6cc3f6',
        'secondary': '#e8e2e2',
        'tertiary': '#6aa2d1',
        'dark': '#0f59ff',
        'warning': "#e2b95d"
      },
      fontSize:{
        'header' : '64px',
      }
    },
  },
  plugins: [],
}

