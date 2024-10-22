/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{vue,ts}',
  ],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: [
        'Rubik, sans-serif',
      ],
    },
    extend: {
    },
  },
  plugins: [
    require('tailwindcss-primeui'),
  ],
}
