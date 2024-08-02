/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{vue,ts}',
  ],
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
