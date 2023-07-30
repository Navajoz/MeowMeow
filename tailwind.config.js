/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#EEEBDD',
        medium: '#D8B6A4',
        dark: '#630000',
      },
      fontFamily: {
        texto: 'IBM Plex Mono',
        titulos: 'Pacifico'
      }
    },
  },
  plugins: [],
};
