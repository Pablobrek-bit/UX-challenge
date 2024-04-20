/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#DBFFF5',
          400: '#54D9B3',
          500: '#35BE97',
          600: '#25856A',
          700: '#225A57',
        },
        secondary: {
          500: '#7B45F7',
          600: '#5F2EEA',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [],
}
