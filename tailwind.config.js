/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
      }
    },
  },
  plugins: [],
}
