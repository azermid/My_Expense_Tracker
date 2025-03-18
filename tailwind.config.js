/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        dark: {
          100: '#1f2937',
          200: '#111827',
          300: '#0f172a'
        }
      }
    }
  },
  plugins: []
}