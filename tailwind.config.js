/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          base: '#0B1120', 
          surface: '#111827', 
          border: '#1F2937', 
        }
      }
    },
  },
  plugins: [],
}