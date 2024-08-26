/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'secondary': '#2563eb',
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

