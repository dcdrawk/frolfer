/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    fontFamily: {
      'sans': ['Rubik'],
    },
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}

